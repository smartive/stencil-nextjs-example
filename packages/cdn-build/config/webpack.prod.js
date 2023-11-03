module.exports = {
  entry: ["./src/components.tsx"],
  mode: "production",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    path: require("path").resolve(__dirname, "..", "build"),
    publicPath: process.env.OUTPUT_PUBLIC_PATH || "/",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json"],
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            rootMode: "upward",
          },
        },
      },
    ],
  },
};
