import { type Block, Node, type ObjectLiteralExpression, type Project, type VariableDeclaration } from "ts-morph";
import { dedent } from "../utils.ts";
import type { StoryExample } from "../types.ts";

const ANTI_PATTERN_PREFIX = "AntiPattern_";

export function extractStories(project: Project, storiesFile: string | null): Array<StoryExample> {
  if (!storiesFile) return [];

  const source = project.addSourceFileAtPathIfExists(storiesFile);
  if (!source) return [];

  const out: Array<StoryExample> = [];

  for (const decl of source.getVariableDeclarations()) {
    if (!isExported(decl)) continue;

    const initializer = decl.getInitializer();
    if (!initializer || !Node.isCallExpression(initializer)) continue;

    const callee = initializer.getExpression().getText();
    if (!callee.endsWith(".story")) continue;

    const name = decl.getName();
    if (name === "default") continue;

    const configArg = initializer.getArguments()[0];
    const config = configArg && Node.isObjectLiteralExpression(configArg) ? configArg : null;
    const code = config ? (extractRenderCode(config) ?? extractArgsCode(config)) : null;
    const description = config ? extractStoryDescription(config) : null;

    out.push({
      name,
      isAntiPattern: name.startsWith(ANTI_PATTERN_PREFIX),
      code,
      description
    });
  }

  return out;
}

function isExported(decl: VariableDeclaration): boolean {
  const stmt = decl.getVariableStatement();
  return stmt?.isExported() ?? false;
}

// ---------------------------------------------------------------------------
// render() body extraction
// ---------------------------------------------------------------------------

function extractRenderCode(config: ObjectLiteralExpression): string | null {
  const renderProp = config.getProperty("render");
  if (!renderProp) return null;

  if (Node.isPropertyAssignment(renderProp)) {
    const fn = renderProp.getInitializer();
    return fn ? extractFunctionBody(fn) : null;
  }

  if (Node.isMethodDeclaration(renderProp)) {
    return extractFunctionBody(renderProp);
  }

  return null;
}

function extractFunctionBody(node: Node): string | null {
  if (Node.isArrowFunction(node)) {
    const body = node.getBody();
    if (Node.isParenthesizedExpression(body)) {
      return dedent(body.getExpression().getText());
    }
    if (Node.isJsxElement(body) || Node.isJsxSelfClosingElement(body) || Node.isJsxFragment(body)) {
      return dedent(body.getText());
    }
    if (Node.isBlock(body)) {
      return extractReturnText(body);
    }
  }

  if (Node.isFunctionExpression(node) || Node.isMethodDeclaration(node)) {
    const body = node.getBody();
    if (body && Node.isBlock(body)) {
      return extractReturnText(body);
    }
  }

  return null;
}

function extractReturnText(block: Block): string | null {
  for (const stmt of block.getStatements()) {
    if (Node.isReturnStatement(stmt)) {
      const expr = stmt.getExpression();
      if (!expr) return null;
      if (Node.isParenthesizedExpression(expr)) {
        return dedent(expr.getExpression().getText());
      }
      return dedent(expr.getText());
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// args fallback (for stories without render)
// ---------------------------------------------------------------------------

function extractArgsCode(config: ObjectLiteralExpression): string | null {
  const argsProp = config.getProperty("args");
  if (!argsProp || !Node.isPropertyAssignment(argsProp)) return null;

  const initializer = argsProp.getInitializer();
  if (!initializer || !Node.isObjectLiteralExpression(initializer)) return null;

  return initializer.getText();
}

function extractStoryDescription(config: ObjectLiteralExpression): string | null {
  const params = config.getProperty("parameters");
  if (!params || !Node.isPropertyAssignment(params)) return null;

  const paramsObj = params.getInitializer();
  if (!paramsObj || !Node.isObjectLiteralExpression(paramsObj)) return null;

  const docs = paramsObj.getProperty("docs");
  if (!docs || !Node.isPropertyAssignment(docs)) return null;

  const docsObj = docs.getInitializer();
  if (!docsObj || !Node.isObjectLiteralExpression(docsObj)) return null;

  const description = docsObj.getProperty("description");
  if (!description || !Node.isPropertyAssignment(description)) return null;

  const descObj = description.getInitializer();
  if (!descObj || !Node.isObjectLiteralExpression(descObj)) return null;

  const story = descObj.getProperty("story");
  if (!story || !Node.isPropertyAssignment(story)) return null;

  const value = story.getInitializer();
  if (!value || !Node.isStringLiteral(value)) return null;

  return value.getLiteralText();
}
