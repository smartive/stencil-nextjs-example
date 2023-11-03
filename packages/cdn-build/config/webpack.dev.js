// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./webpack.prod");

module.exports = {
  ...config,
  plugins: [
    ...(config.plugins || []),
    new HtmlWebpackPlugin({
      title: "CDN Example",
      template: "example.html",
    }),
  ],
  optimization: {
    ...config.optimization,
    concatenateModules: false,
  },
};
