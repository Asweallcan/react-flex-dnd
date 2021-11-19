const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "examples/index.tsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    library: {
      name: "examaples",
      type: "umd",
      export: "default",
    },
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
      template: "examples/public/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    host: "localhost",
    port: "9999",
  },
};
