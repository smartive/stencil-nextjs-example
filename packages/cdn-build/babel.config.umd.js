module.exports = function (api) {
  const env = api.env();
  api.cache(true);

  const presets = [
    "@babel/typescript",
    "@babel/react",
    [
      "@babel/env",
      {
        corejs: 3,
        useBuiltIns: "usage",
        modules: "umd",
      },
    ],
  ];

  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3,
      },
    ],
    "babel-plugin-inline-package-json",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-nullish-coalescing-operator",
    "@babel/proposal-optional-chaining",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-named-capturing-groups-regex",
    "babel-plugin-styled-components",
    [
      "transform-inline-environment-variables",
      {
        include: ["npm_package_name", "npm_package_version"],
      },
    ],
  ];

  if (env !== "development" && env !== "test") {
    plugins.push("babel-plugin-jsx-remove-data-test-id");
  }

  return {
    presets,
    plugins,
    sourceType: "unambiguous",
  };
};
