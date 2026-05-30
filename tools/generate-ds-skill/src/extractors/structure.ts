import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "ts-morph";
import { pascalCase } from "../utils.ts";

export function loadPublicExports(project: Project, srcDir: string): Set<string> {
  const rootBarrel = ["index.ts", "index.tsx"].map((f) => join(srcDir, f)).find((p) => existsSync(p));

  if (!rootBarrel) return new Set();

  const source = project.addSourceFileAtPathIfExists(rootBarrel);
  if (!source) return new Set();

  const out = new Set<string>();

  for (const exp of source.getExportDeclarations()) {
    // named exports: export { Button, ButtonProps } from "./button"
    for (const named of exp.getNamedExports()) {
      out.add(named.getAliasNode()?.getText() ?? named.getName());
    }

    // star re-exports: export * from "./button-group"
    if (exp.getNamedExports().length === 0) {
      const specifier = exp.getModuleSpecifierValue();
      if (specifier) {
        const segment = specifier.replace(/^\.\//, "").split("/").pop() ?? "";
        if (segment) out.add(pascalCase(segment));
      }
    }
  }

  return out;
}

export function deriveNotes(props: Array<{ name: string }>): Array<string> {
  const notes: Array<string> = [];
  const propNames = new Set(props.map((p) => p.name));

  const hasAsChild = propNames.has("asChild");
  const hasHref = propNames.has("href");
  const hasOnClick = propNames.has("onClick");

  if (hasOnClick && !hasHref && hasAsChild) {
    notes.push("Does not accept `href`. For navigation, use `asChild` with `<a>` or framework `<Link>`.");
  }

  if (hasAsChild) {
    notes.push("Supports `asChild` (polymorphic via Radix `Slot`).");
  }

  return notes;
}
