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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const baseConfig = require("./babel.config.umd.js")(api);

  return {
    ...baseConfig,
    presets,
  };
};
