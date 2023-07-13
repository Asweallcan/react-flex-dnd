const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "../examples/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../examples_dist"),
    filename: "index.[contenthash].js",
    publicPath: "./examples_dist/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react flex dnd examples",
      template: path.resolve(__dirname, "../examples/public/index.html"),
      filename: "index.html",
      inject: true,
    }),
  ],
  devServer: {
    host: "localhost",
    port: "9999",
  },
});
