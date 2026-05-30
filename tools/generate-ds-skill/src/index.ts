#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { Project } from "ts-morph";
import { loadConfig } from "./config.ts";
import { discoverComponents } from "./discover.ts";
import { extractColors } from "./extractors/colors.ts";
import { extractCva } from "./extractors/cva.ts";
import { extractProps } from "./extractors/props.ts";
import { extractStories } from "./extractors/stories.ts";
import { extractTypography } from "./extractors/typography.ts";
import { deriveNotes, loadPublicExports } from "./extractors/structure.ts";
import { componentFileName, renderComponentMd } from "./emitters/component.ts";
import { renderIndexMd } from "./emitters/index-md.ts";
import { renderSkillMd, rewriteAutoBlock } from "./emitters/skill.ts";
import { renderTokensMd } from "./emitters/tokens-md.ts";
import { renderTypographyMd } from "./emitters/typography-md.ts";
import type { ComponentDoc } from "./types.ts";

function main(): void {
  const config = loadConfig(process.argv.slice(2));

  if (!existsSync(config.srcDir)) {
    console.error(`Source dir not found: ${config.srcDir}`);
    process.exit(1);
  }

  console.log(`Generating snapshot for ${config.packageName}@${config.packageVersion}`);
  console.log(`  src: ${config.srcDir}`);
  console.log(`  out: ${config.outDir}`);

  const locations = discoverComponents(config.srcDir);
  console.log(`Discovered ${locations.length} components`);

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    skipLoadingLibFiles: true,
    compilerOptions: { allowJs: false, jsx: 4 /* Preserve */ }
  });

  const publicExports = loadPublicExports(project, config.srcDir);

  const docs: Array<ComponentDoc> = locations.map((loc) => {
    const props = extractProps(project, loc.componentFile, loc.name);
    const cva = extractCva(project, loc.variantsFile);
    const stories = extractStories(project, loc.storiesFile);
    const notes = deriveNotes(props);

    return {
      name: loc.name,
      category: loc.category,
      isPublic: publicExports.has(loc.name),
      importPath: config.packageName,
      componentFile: loc.componentFile,
      props,
      cva,
      stories,
      notes
    };
  });

  writeSnapshot(config, docs);
  console.log(`Done. ${docs.length} component files emitted.`);
}

function writeSnapshot(config: ReturnType<typeof loadConfig>, docs: Array<ComponentDoc>): void {
  const componentsDir = join(config.outDir, "references", "components");

  if (existsSync(componentsDir)) {
    rmSync(componentsDir, { recursive: true, force: true });
  }
  mkdirSync(componentsDir, { recursive: true });

  writeFile(join(config.outDir, "VERSION"), `${config.packageVersion}\n`);

  const indexPath = join(config.outDir, "references", "_index.md");
  writeFile(
    indexPath,
    renderIndexMd(
      config,
      docs.filter((d) => d.isPublic)
    )
  );

  writeDesignTokens(config);

  for (const doc of docs) {
    if (!doc.isPublic) continue;
    const path = join(componentsDir, componentFileName(doc.name));
    writeFile(path, renderComponentMd(doc));
  }

  const skillPath = join(config.outDir, "SKILL.md");
  const skillContent = existsSync(skillPath)
    ? rewriteAutoBlock(readFileSync(skillPath, "utf8"), config, docs.filter((d) => d.isPublic).length)
    : renderSkillMd(config, docs.filter((d) => d.isPublic).length);
  writeFile(skillPath, skillContent);
}

function writeDesignTokens(config: ReturnType<typeof loadConfig>): void {
  const colors = extractColors(config.cssDir);
  if (colors.length > 0) {
    writeFile(join(config.outDir, "references", "tokens.md"), renderTokensMd(config, colors));
    const tokenCount = colors.reduce((sum, g) => sum + g.tokens.length, 0);
    console.log(`  tokens: ${tokenCount} color tokens`);
  } else {
    console.log("  tokens: palette.css not found — skipped");
  }

  const typography = extractTypography(config.cssDir);
  if (typography.utilities.length > 0 || typography.fontSizes.length > 0) {
    writeFile(join(config.outDir, "references", "typography.md"), renderTypographyMd(config, typography));
    console.log(`  typography: ${typography.utilities.length} utilities`);
  } else {
    console.log("  typography: typography.css not found — skipped");
  }
}

function writeFile(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

main();
