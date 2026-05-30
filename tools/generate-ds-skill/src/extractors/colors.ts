import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ColorTokenGroup } from "../types.ts";

/**
 * Parses `palette.css` into ordered, grouped semantic color tokens.
 *
 * Strategy (regex/line-based, no CSS AST):
 *   - `:root { ... }`        → light values per `--var`
 *   - `.dark { ... }`        → dark values per `--var`
 *   - `@theme inline { ... }` → which `--color-*` tokens are exposed as Tailwind
 *                               utilities, in source order, with `/* ... *​/` headers
 *                               used as group titles.
 *
 * Missing file → empty result (skip section, not an error).
 */
export function extractColors(cssDir: string): Array<ColorTokenGroup> {
  const file = join(cssDir, "palette.css");
  if (!existsSync(file)) return [];

  const css = readFileSync(file, "utf8");

  const rootVars = parseDeclarations(extractBlock(css, /:root\s*\{/));
  const darkVars = parseDeclarations(extractBlock(css, /\.dark\s*\{/));
  const themeBlock = extractBlock(css, /@theme\s+inline\s*\{/);

  return parseThemeColorGroups(themeBlock, rootVars, darkVars);
}

function parseThemeColorGroups(
  themeBlock: string,
  rootVars: Map<string, string>,
  darkVars: Map<string, string>
): Array<ColorTokenGroup> {
  const groups: Array<ColorTokenGroup> = [];
  let current: ColorTokenGroup | null = null;

  for (const rawLine of themeBlock.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const commentMatch = line.match(/^\/\*\s*(.+?)\s*\*\/$/);
    if (commentMatch) {
      current = { title: commentMatch[1]!, tokens: [] };
      groups.push(current);
      continue;
    }

    // --color-<token>: var(--<ref>);
    const decl = line.match(/^--color-([\w-]+):\s*var\(--([\w-]+)\)\s*;?$/);
    if (!decl) continue;

    const token = decl[1]!;
    const ref = decl[2]!;

    const light = rootVars.get(ref);
    if (light === undefined) continue; // not a resolvable color (e.g. --radius)

    if (!current) {
      current = { title: "Colors", tokens: [] };
      groups.push(current);
    }

    const dark = darkVars.get(ref) ?? light;
    current.tokens.push({
      name: token,
      light: simplifyValue(light),
      dark: simplifyValue(dark)
    });
  }

  return groups.filter((g) => g.tokens.length > 0);
}

/** `var(--color-blue-600)` → `blue-600` (Tailwind built-in); `oklch(...)` kept verbatim. */
function simplifyValue(value: string): string {
  const builtin = value.match(/^var\(--color-([\w-]+)\)$/);
  if (builtin) return builtin[1]!;
  return value;
}

/** Captures the brace-balanced body following the first selector match. */
function extractBlock(css: string, selector: RegExp): string {
  const match = selector.exec(css);
  if (!match) return "";

  let depth = 0;
  let started = false;
  let start = 0;

  for (let i = match.index; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") {
      depth++;
      if (!started) {
        started = true;
        start = i + 1;
      }
    } else if (ch === "}") {
      depth--;
      if (started && depth === 0) {
        return css.slice(start, i);
      }
    }
  }
  return "";
}

function parseDeclarations(block: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const rawLine of block.split("\n")) {
    const line = stripComment(rawLine).trim();
    const match = line.match(/^--([\w-]+):\s*(.+?)\s*;?$/);
    if (match) out.set(match[1]!, match[2]!);
  }
  return out;
}

function stripComment(line: string): string {
  return line.replace(/\/\*.*?\*\//g, "");
}
