import { Node, type ObjectLiteralExpression, type Project, SyntaxKind } from "ts-morph";
import type { CvaVariants } from "../types.ts";

export function extractCva(project: Project, variantsFile: string | null): CvaVariants | null {
  if (!variantsFile) return null;

  const source = project.addSourceFileAtPathIfExists(variantsFile);
  if (!source) return null;

  const cvaCall = source
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((c) => c.getExpression().getText() === "cva");

  if (!cvaCall) return null;

  const configArg = cvaCall.getArguments()[1];
  if (!configArg || !Node.isObjectLiteralExpression(configArg)) return null;

  const variants = readVariants(configArg);
  const defaultVariants = readDefaultVariants(configArg);

  if (Object.keys(variants).length === 0) return null;

  return { variants, defaultVariants };
}

function readVariants(config: ObjectLiteralExpression): Record<string, Array<string>> {
  const variantsProp = config.getProperty("variants");
  if (!variantsProp || !Node.isPropertyAssignment(variantsProp)) return {};

  const initializer = variantsProp.getInitializer();
  if (!initializer || !Node.isObjectLiteralExpression(initializer)) return {};

  const out: Record<string, Array<string>> = {};
  for (const prop of initializer.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) continue;
    const valuesObj = prop.getInitializer();
    if (!valuesObj || !Node.isObjectLiteralExpression(valuesObj)) continue;

    out[prop.getName()] = valuesObj
      .getProperties()
      .filter(Node.isPropertyAssignment)
      .map((p) => stripQuotes(p.getName()));
  }
  return out;
}

function readDefaultVariants(config: ObjectLiteralExpression): Record<string, string> {
  const prop = config.getProperty("defaultVariants");
  if (!prop || !Node.isPropertyAssignment(prop)) return {};

  const initializer = prop.getInitializer();
  if (!initializer || !Node.isObjectLiteralExpression(initializer)) return {};

  const out: Record<string, string> = {};
  for (const p of initializer.getProperties()) {
    if (!Node.isPropertyAssignment(p)) continue;
    const value = p.getInitializer();
    if (!value) continue;
    out[p.getName()] = stripQuotes(value.getText());
  }
  return out;
}

function stripQuotes(input: string): string {
  return input.replace(/^["']|["']$/g, "");
}
