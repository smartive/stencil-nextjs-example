// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./webpack.prod");

module.exports = {
  ...config,
  plugins: [
    ...(config.plugins || []),
    new HtmlWebpackPlugin({
      title: "Embed widget example",
      template: "widget-example.html",
    }),
  ],
  optimization: {
    ...config.optimization,
    concatenateModules: false,
  },
};
