const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "../examples/index.tsx"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../examples_dist"),
    filename: "index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react flex dnd examples",
      inject: true,
      template: path.resolve(__dirname, "../examples/public/index.html"),
      filename: "index.html",
      publicPath: "./examples_dist",
    }),
  ],
});
