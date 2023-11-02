const base = require("./babel.config.umd.js");

module.exports = function (api) {
  const presets = [
    "@babel/typescript",
    ["@babel/react", { runtime: "automatic" }],
    [
      "@babel/env",
      {
        corejs: 3,
        useBuiltIns: "usage",
        modules: false,
      },
    ],
  ];

  const baseConfig = base(api);

  return {
    ...baseConfig,
    presets,
  };
};
