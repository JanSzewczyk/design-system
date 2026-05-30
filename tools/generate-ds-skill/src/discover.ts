import { existsSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, relative, sep } from "node:path";
import { pascalCase } from "./utils.ts";

export type ComponentLocation = {
  name: string;
  category: string;
  dir: string;
  componentFile: string;
  variantsFile: string | null;
  storiesFile: string | null;
};

const SKIP_DIRS = new Set(["__tests__", "node_modules", ".storybook"]);

export function discoverComponents(srcDir: string): Array<ComponentLocation> {
  const found: Array<ComponentLocation> = [];
  walk(srcDir, srcDir, found);
  return found.sort((a, b) => a.name.localeCompare(b.name));
}

function walk(root: string, dir: string, acc: Array<ComponentLocation>): void {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;

    const folderName = basename(full);
    const componentFile = join(full, `${folderName}.tsx`);

    if (existsSync(componentFile)) {
      acc.push(buildLocation(root, full, folderName));
    } else {
      walk(root, full, acc);
    }
  }
}

function buildLocation(root: string, dir: string, folderName: string): ComponentLocation {
  const variantsFile = join(dir, `${folderName}.styles.ts`);
  const storiesFile = join(dir, `${folderName}.stories.tsx`);

  return {
    name: pascalCase(folderName),
    category: deriveCategory(root, dir),
    dir,
    componentFile: join(dir, `${folderName}.tsx`),
    variantsFile: existsSync(variantsFile) ? variantsFile : null,
    storiesFile: existsSync(storiesFile) ? storiesFile : null
  };
}

function deriveCategory(root: string, dir: string): string {
  const rel = relative(root, dirname(dir));
  if (!rel) return "Misc";
  const first = rel.split(sep)[0];
  if (!first) return "Misc";
  return titleCase(first);
}

function titleCase(input: string): string {
  return input
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join(" ");
}
