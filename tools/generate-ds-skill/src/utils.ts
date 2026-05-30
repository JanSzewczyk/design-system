import { readFileSync } from "node:fs";

export function kebabCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function pascalCase(input: string): string {
  return input
    .split(/[-_]/g)
    .filter(Boolean)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join("");
}

export function readJson<T = unknown>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function uniq<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}

export function dedent(text: string): string {
  const lines = text.split("\n");
  if (lines.length <= 1) return text.trim();

  // getText() strips the leading whitespace of the first token, so the first line
  // often has 0 indent while subsequent lines keep their original file indentation.
  // Compute min-indent from subsequent lines when the first line has no indent.
  const firstIndent = lines[0]!.match(/^(\s*)/)?.[1]?.length ?? 0;
  const refLines = firstIndent === 0 ? lines.slice(1) : lines;
  const nonEmpty = refLines.filter((l) => l.trim().length > 0);

  if (nonEmpty.length === 0) return text.trim();

  const minIndent = Math.min(...nonEmpty.map((l) => l.match(/^(\s*)/)?.[1]?.length ?? 0));
  if (minIndent === 0) return text.trim();

  return [lines[0]!, ...lines.slice(1).map((l) => l.slice(minIndent))].join("\n").trim();
}
