import type { CssVariable, GeneratorConfig, TypographyDoc } from "../types.ts";

export function renderTypographyMd(config: GeneratorConfig, doc: TypographyDoc): string {
  const lines: Array<string> = [];

  lines.push(`# Typography — ${config.packageName} ${config.packageVersion}`);
  lines.push("");
  lines.push(
    "Use these utility classes for text styling instead of ad-hoc `text-*`/`font-*` combinations.",
    "Each class bundles font-size, line-height, weight and tracking — including responsive scaling."
  );
  lines.push("");

  if (doc.utilities.length > 0) {
    lines.push("## Text utilities");
    lines.push("");
    lines.push("| Class | Applies |");
    lines.push("|---|---|");
    for (const util of doc.utilities) {
      lines.push(`| \`${util.name}\` | \`${escapePipes(util.apply)}\` |`);
    }
    lines.push("");
  }

  if (doc.fonts.length > 0) {
    lines.push("## Font families");
    lines.push("");
    for (const font of doc.fonts) {
      lines.push(`- \`${font.name}\` — ${font.value}`);
    }
    lines.push("");
  }

  appendScale(lines, "Font sizes", doc.fontSizes, true);
  appendScale(lines, "Line heights", doc.lineHeights, false);
  appendScale(lines, "Letter spacing", doc.letterSpacings, false);

  return lines.join("\n");
}

function appendScale(lines: Array<string>, title: string, vars: Array<CssVariable>, showComment: boolean): void {
  if (vars.length === 0) return;

  lines.push(`## ${title}`);
  lines.push("");
  for (const v of vars) {
    const note = showComment && v.comment ? ` (${v.comment})` : "";
    lines.push(`- \`${v.name}\` — ${v.value}${note}`);
  }
  lines.push("");
}

function escapePipes(text: string): string {
  return text.replace(/\|/g, "\\|");
}
