import { componentFileName } from "./component.ts";
import type { ComponentDoc, GeneratorConfig } from "../types.ts";

export function renderIndexMd(config: GeneratorConfig, docs: Array<ComponentDoc>): string {
  const byCategory = new Map<string, Array<ComponentDoc>>();
  for (const doc of docs) {
    const list = byCategory.get(doc.category) ?? [];
    list.push(doc);
    byCategory.set(doc.category, list);
  }

  const lines: Array<string> = [];
  lines.push(`# Components inventory — ${config.packageName} ${config.packageVersion}`);
  lines.push("");
  lines.push(
    "Read this file first when implementing UI. Load `components/<name>.md` only for the components you'll actually use."
  );
  lines.push("");

  const sortedCategories = Array.from(byCategory.keys()).sort();
  for (const category of sortedCategories) {
    lines.push(`## ${category}`);
    const list = byCategory.get(category)!.sort((a, b) => a.name.localeCompare(b.name));
    for (const doc of list) {
      const file = componentFileName(doc.name);
      const summary = doc.props.length > 0 ? `${doc.props.length} props` : "no props";
      const stories = doc.stories.length > 0 ? `, ${doc.stories.length} stories` : "";
      const visibility = doc.isPublic ? "" : " *(internal)*";
      lines.push(`- **${doc.name}**${visibility} — ${summary}${stories}. → \`components/${file}\``);
    }
    lines.push("");
  }

  return lines.join("\n");
}
