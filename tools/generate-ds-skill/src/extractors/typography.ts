import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { CssVariable, TypographyDoc, TypographyUtility } from "../types.ts";

/**
 * Parses `typography.css` into font tokens + utility classes.
 *
 * - `@theme { ... }` → `--font-*`, `--font-size-*`, `--line-height-*`,
 *   `--letter-spacing-*` (with trailing `/* px *​/` comments preserved).
 * - `@utility text-* { ... }` and plain `.text-* { ... }` rules → the verbatim
 *   `@apply` directive (whitespace collapsed). We do NOT decompose `@apply` into
 *   fields — responsive prefixes and arbitrary values make that brittle.
 *
 * Missing file → empty doc (skip section, not an error).
 */
export function extractTypography(cssDir: string): TypographyDoc {
  const empty: TypographyDoc = { fonts: [], fontSizes: [], lineHeights: [], letterSpacings: [], utilities: [] };

  const file = join(cssDir, "typography.css");
  if (!existsSync(file)) return empty;

  const css = readFileSync(file, "utf8");

  const themeVars = parseThemeVars(extractBlock(css, /@theme\s*\{/));

  return {
    fonts: themeVars.filter((v) => v.name.startsWith("font-") && !v.name.startsWith("font-size-")),
    fontSizes: themeVars.filter((v) => v.name.startsWith("font-size-")),
    lineHeights: themeVars.filter((v) => v.name.startsWith("line-height-")),
    letterSpacings: themeVars.filter((v) => v.name.startsWith("letter-spacing-")),
    utilities: parseUtilities(css)
  };
}

function parseThemeVars(block: string): Array<CssVariable> {
  const out: Array<CssVariable> = [];
  for (const rawLine of block.split("\n")) {
    const line = rawLine.trim();
    const match = line.match(/^--([\w-]+):\s*([^;]+?)\s*;\s*(?:\/\*\s*(.+?)\s*\*\/)?\s*$/);
    if (!match) continue;
    out.push({ name: match[1]!, value: match[2]!, comment: match[3] ?? null });
  }
  return out;
}

/** Matches both `@utility text-foo {` and `.text-foo {`, in source order. */
function parseUtilities(css: string): Array<TypographyUtility> {
  const out: Array<TypographyUtility> = [];
  const ruleStart = /(?:@utility\s+|\.)(text-[\w-]+)\s*\{/g;

  let match: RegExpExecArray | null;
  while ((match = ruleStart.exec(css)) !== null) {
    const name = match[1]!;
    const body = captureBlockFrom(css, match.index + match[0].length - 1);
    const apply = extractApply(body);
    if (apply) out.push({ name, apply });
  }
  return out;
}

function extractApply(body: string): string | null {
  const match = body.match(/@apply\s+([^;]+);/);
  if (!match) return null;
  return match[1]!.replace(/\s+/g, " ").trim();
}

/** Captures the brace-balanced body following the first selector match. */
function extractBlock(css: string, selector: RegExp): string {
  const match = selector.exec(css);
  if (!match) return "";
  return captureBlockFrom(css, match.index + match[0].length - 1);
}

/** `openBraceIndex` points at the `{`; returns content up to its matching `}`. */
function captureBlockFrom(css: string, openBraceIndex: number): string {
  let depth = 0;
  let start = openBraceIndex + 1;
  for (let i = openBraceIndex; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return css.slice(start, i);
    }
  }
  return "";
}
