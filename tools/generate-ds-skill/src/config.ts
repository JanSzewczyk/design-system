import { resolve } from "node:path";
import mri from "mri";
import { readJson } from "./utils.ts";
import type { GeneratorConfig } from "./types.ts";

type PkgJson = { name: string; version: string };

export function loadConfig(argv: Array<string>): GeneratorConfig {
  const args = mri(argv, {
    string: ["src", "out", "pkg", "css"],
    default: {
      src: "./src/components",
      out: "./ds-skill-snapshot",
      pkg: "./package.json",
      css: "./src/tailwind"
    }
  });

  const pkgPath = resolve(args.pkg);
  const pkg = readJson<PkgJson>(pkgPath);

  return {
    srcDir: resolve(args.src),
    outDir: resolve(args.out),
    cssDir: resolve(args.css),
    pkgPath,
    packageName: pkg.name,
    packageVersion: pkg.version
  };
}
