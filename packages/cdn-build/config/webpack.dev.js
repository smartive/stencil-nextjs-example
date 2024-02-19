// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./webpack.prod");

module.exports = {
  ...config,
  output: {
    ...config.output,
    publicPath: "/",
  },
  optimization: {
    ...config.optimization,
    concatenateModules: false,
  },
};
