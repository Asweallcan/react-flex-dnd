const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../examples/index.tsx"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../examples_dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|bower_components|\.d\.ts$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
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
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
