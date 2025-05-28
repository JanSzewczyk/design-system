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

updateFilesWithText(["dist/components/index.js", "dist/components/index.cjs"], '"use client";\n\n').then(() => {
  console.log("Files updated successfully");
});
