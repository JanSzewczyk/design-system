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

await updateFilesWithText(["dist/components/index.js", "dist/components/index.cjs"], '"use client";\n\n');
await copyDts("dist");

console.log("Post-build complete");
