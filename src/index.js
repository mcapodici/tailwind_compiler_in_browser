var r = require("process");
r.versions.node = "1.0.0";

import preflightcss from "inline:../node_modules/tailwindcss/lib/css/preflight.css";
const fs = require("fs");
const tailwindcss = require("tailwindcss");
const postcss = require("postcss");

const VIRTUAL_HTML_FILENAME = "./test.html";

function main() {
  async function tailwindify(html, customCss, userConfig) {
    fs.mkdirSync("/css");
    fs.writeFileSync("/css/preflight.css", preflightcss);
    fs.writeFileSync(VIRTUAL_HTML_FILENAME, html);

    let defaultConfig = {
      content: { files: [VIRTUAL_HTML_FILENAME] },
      mode: "jit",
      theme: {},
      plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
      ],
    };

    userConfig = userConfig || {};
    const safeParser = require("postcss-safe-parser");

    let result;
    try {
      result = await postcss([
        tailwindcss({ ...defaultConfig, ...userConfig }),
      ]).process(customCss, {
        from: "/",
        parser: safeParser,
      });
    } catch (error) {
      return { css: "", error };
    }

    return result;
  }
  return tailwindify;
}
window.tailwindify = main();
