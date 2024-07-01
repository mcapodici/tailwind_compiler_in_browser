var r = require("process");
r.versions.node = "1.0.0";

import preflightcss from "inline:../node_modules/tailwindcss/lib/css/preflight.css";
const fs = require("fs");
const tailwindcss = require("tailwindcss");
const postcss = require("postcss");

const VIRTUAL_HTML_FILENAME = "./test.html";
window.tailwindify = {};
window.tailwindify.compile = async (html, customCss, userConfig) => {
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
};
window.tailwindify.run = () => {
  function parseCustomConfig() {
    let userConfig = {};

    try {
      let customConfig = document.querySelector(
        'script[type="tailwind-config"]'
      ).innerText;
      userConfig =
        eval(`module={}
twc = ${customConfig}
delete twc.content
twc
`) || {};
    } catch (err) {
      console.log("error parsing config", err);
    }

    return userConfig;
  }
  let customCss = "";

  document.querySelectorAll('style[type="postcss"]').forEach((styleTag) => {
    customCss += styleTag.innerHTML;
  });

  const htmlString = document.documentElement.outerHTML;
  const userConfig = parseCustomConfig();
  tailwindify.compile(htmlString, customCss, userConfig).then((tw) => {
    if ("error" in tw) {
      console.log("error in tailwind csss", tw.error.message);
    }
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = tw.css;
    document.head.appendChild(styleSheet);
  });

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
};
