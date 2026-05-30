import type { ColorTokenGroup, GeneratorConfig } from "../types.ts";

export function renderTokensMd(config: GeneratorConfig, groups: Array<ColorTokenGroup>): string {
  const lines: Array<string> = [];

  lines.push(`# Color tokens — ${config.packageName} ${config.packageVersion}`);
  lines.push("");
  lines.push(
    "Semantic OKLCH tokens. **Never use raw `oklch(...)` literals or hex colors** — always use the",
    "semantic token via a Tailwind utility prefix:"
  );
  lines.push("");
  lines.push("- `bg-<token>` — background");
  lines.push("- `text-<token>` — text color");
  lines.push("- `border-<token>` — border color");
  lines.push("- `ring-<token>` — focus ring");
  lines.push("");
  lines.push(
    "Tokens come in pairs: a surface token (e.g. `primary`, `card`) and its `*-foreground`",
    "counterpart for readable content on that surface — e.g. `bg-primary text-primary-foreground`."
  );
  lines.push("");
  lines.push("Values shown as `name` (e.g. `blue-600`) are Tailwind built-in palette references.");
  lines.push("");

  for (const group of groups) {
    lines.push(`## ${group.title}`);
    lines.push("");
    lines.push("| Token | Light | Dark |");
    lines.push("|---|---|---|");
    for (const token of group.tokens) {
      lines.push(`| \`${token.name}\` | \`${token.light}\` | \`${token.dark}\` |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
