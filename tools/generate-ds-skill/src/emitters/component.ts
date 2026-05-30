import { kebabCase } from "../utils.ts";
import type { ComponentDoc, ComponentProp, CvaVariants, StoryExample } from "../types.ts";

export function renderComponentMd(doc: ComponentDoc): string {
  const lines: Array<string> = [];

  lines.push(`# ${doc.name}`);
  lines.push("");
  lines.push(
    `**Category:** ${doc.category} · **Public:** ${doc.isPublic ? "yes" : "no"} · **Stories:** ${doc.stories.length}`
  );
  lines.push("");

  lines.push("## Import");
  lines.push("```ts");
  lines.push(`import { ${doc.name} } from "${doc.importPath}";`);
  lines.push("```");
  lines.push("");

  if (doc.props.length > 0) {
    lines.push("## Props");
    lines.push(renderPropsTable(doc.props));
    lines.push("");
  }

  if (doc.cva) {
    lines.push("## Variants");
    lines.push(renderCva(doc.cva));
    lines.push("");
  }

  const usable = doc.stories.filter((s) => !s.isAntiPattern);
  if (usable.length > 0) {
    lines.push("## Examples");
    for (const s of usable) {
      lines.push(renderStorySection(doc.name, s));
    }
  }

  const antiPatterns = doc.stories.filter((s) => s.isAntiPattern);
  if (antiPatterns.length > 0) {
    lines.push("## Anti-patterns");
    for (const s of antiPatterns) {
      lines.push(renderStorySection(doc.name, s));
    }
  }

  if (doc.notes.length > 0) {
    lines.push("## Notes");
    for (const n of doc.notes) {
      lines.push(`- ${n}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function componentFileName(name: string): string {
  return `${kebabCase(name)}.md`;
}

function renderPropsTable(props: Array<ComponentProp>): string {
  const header = "| Prop | Type | Required | Default |";
  const sep = "|---|---|---|---|";
  const rows = props.map(
    (p) => `| \`${p.name}\` | \`${escapePipes(p.type)}\` | ${p.required ? "yes" : "no"} | ${p.defaultValue ?? "—"} |`
  );
  return [header, sep, ...rows].join("\n");
}

function renderCva(cva: CvaVariants): string {
  const lines: Array<string> = [];
  for (const [name, values] of Object.entries(cva.variants)) {
    const def = cva.defaultVariants[name];
    const rendered = values.map((v) => (v === def ? `**${v}** (default)` : v)).join(", ");
    lines.push(`- **${name}**: ${rendered}`);
  }
  return lines.join("\n");
}

function renderStorySection(componentName: string, story: StoryExample): string {
  const lines: Array<string> = [];
  const cleanName = story.name.replace(/^AntiPattern_/, "");
  lines.push(`### ${humanize(cleanName)}`);
  if (story.description) {
    lines.push(story.description);
    lines.push("");
  }
  lines.push("```tsx");
  lines.push(story.code ?? `<${componentName} />`);
  lines.push("```");
  lines.push("");
  return lines.join("\n");
}

function humanize(camel: string): string {
  return camel
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function escapePipes(text: string): string {
  return text.replace(/\|/g, "\\|");
}
