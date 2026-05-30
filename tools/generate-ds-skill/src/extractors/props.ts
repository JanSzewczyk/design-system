import {
  type InterfaceDeclaration,
  Node,
  type Project,
  type PropertySignature,
  type SourceFile,
  type TypeAliasDeclaration,
  type TypeLiteralNode,
  type IntersectionTypeNode
} from "ts-morph";
import type { ComponentProp } from "../types.ts";

export function extractProps(project: Project, componentFile: string, componentName: string): Array<ComponentProp> {
  const source = project.addSourceFileAtPathIfExists(componentFile);
  if (!source) return [];

  const propsTypeName = `${componentName}Props`;

  const declaration =
    source.getInterface(propsTypeName) ??
    source.getTypeAlias(propsTypeName) ??
    findPropsFromFunctionParam(source, componentName);

  if (!declaration) return [];

  const members = collectMembers(declaration);
  return members.map(propertyToProp);
}

function findPropsFromFunctionParam(
  source: SourceFile,
  componentName: string
): InterfaceDeclaration | TypeAliasDeclaration | TypeLiteralNode | null {
  const fn = source.getFunction(componentName);
  if (!fn) return null;

  const param = fn.getParameters()[0];
  if (!param) return null;

  const typeNode = param.getTypeNode();
  if (!typeNode) return null;

  if (Node.isTypeLiteral(typeNode)) return typeNode;

  if (Node.isTypeReference(typeNode)) {
    const name = typeNode.getTypeName().getText();
    return source.getInterface(name) ?? source.getTypeAlias(name) ?? null;
  }

  return null;
}

function collectMembers(node: InterfaceDeclaration | TypeAliasDeclaration | TypeLiteralNode): Array<PropertySignature> {
  if (Node.isInterfaceDeclaration(node)) {
    return node.getProperties();
  }
  if (Node.isTypeLiteral(node)) {
    return node.getProperties();
  }
  const typeNode = node.getTypeNode();
  if (!typeNode) return [];
  if (Node.isTypeLiteral(typeNode)) {
    return typeNode.getProperties();
  }
  // intersection: type Props = SomethingExternal & { customProp: ... }
  if (Node.isIntersectionTypeNode(typeNode)) {
    return (typeNode as IntersectionTypeNode)
      .getTypeNodes()
      .filter(Node.isTypeLiteral)
      .flatMap((t) => (t as TypeLiteralNode).getProperties());
  }
  return [];
}

function propertyToProp(prop: PropertySignature): ComponentProp {
  const name = prop.getName();
  const typeNode = prop.getTypeNode();
  const typeText = typeNode ? collapseType(typeNode.getText()) : "unknown";
  const required = !prop.hasQuestionToken();

  return {
    name,
    type: typeText,
    required,
    defaultValue: extractJsDocDefault(prop)
  };
}

function extractJsDocDefault(prop: PropertySignature): string | null {
  for (const jsdoc of prop.getJsDocs()) {
    for (const tag of jsdoc.getTags()) {
      if (tag.getTagName() === "default" || tag.getTagName() === "defaultValue") {
        return tag.getCommentText()?.trim() ?? null;
      }
    }
  }
  return null;
}

function collapseType(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function hasPropNamed(props: Array<ComponentProp>, name: string): boolean {
  return props.some((p) => p.name === name);
}
