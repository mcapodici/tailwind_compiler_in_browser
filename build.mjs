import { build } from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import inlineImportPlugin from "esbuild-plugin-inline-import";
import chokidar from "chokidar";
import path from "path";

if (process.argv.includes("--watch")) {

  const watcher = chokidar.watch(path.resolve(process.cwd(), "src"), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  watcher.on("change", (filePath) => {
    console.log(`${filePath} has been changed. Rebuilding...`);
    build({
      entryPoints: ["src/index.js"],
      bundle: true,
      minify: true,
      treeShaking: true,
      outfile: "dist/index.js",
      plugins: [
        inlineImportPlugin(),
        polyfillNode({
          polyfills: {
            fs: true,
          },
        }),
      ],
    }).catch(() => {});
  });
} else {
  build({
    entryPoints: ["src/index.js"],
    bundle: true,
    minify: true,
    treeShaking: true,
    outfile: "dist/index.js",
    plugins: [
      inlineImportPlugin(),
      polyfillNode({
        polyfills: {
          fs: true,
        },
      }),
    ],
  });
}
