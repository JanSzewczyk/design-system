import path from "path";

import fs from "fs/promises";

export async function updateFilesWithText(filePaths, text) {
  for (const filePath of filePaths) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      const updatedContent = text + content;
      await fs.writeFile(filePath, updatedContent, "utf8");
      console.log(`Updated: ${filePath}`);
    } catch (err) {
      console.error(`Error updating ${filePath}:`, err);
    }
  }
}

async function copyDts(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await copyDts(fullPath);
    } else if (entry.name.endsWith(".d.ts") && !entry.name.endsWith(".d.cts")) {
      await fs.copyFile(fullPath, fullPath.replace(/\.d\.ts$/, ".d.cts"));
    }
  }
}

// Collect every component entry file (barrel + per-component `index.js`/`index.cjs`).
// esbuild strips the "use client" directive during bundling, so it must be re-added to
// each client boundary — now one per component, not just the barrel.
export async function collectComponentEntries(dir: string): Promise<Array<string>> {
  const result: Array<string> = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await collectComponentEntries(fullPath)));
    } else if (/^index\.(js|cjs)$/.test(entry.name)) {
      result.push(fullPath);
    }
  }
  return result;
}

const componentEntries = await collectComponentEntries("dist/components");
await updateFilesWithText(componentEntries, '"use client";\n\n');
await copyDts("dist");

console.log("Post-build complete");
