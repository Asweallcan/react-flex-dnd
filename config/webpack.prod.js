const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, "../src/index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|bower_components/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: {
      name: "react-flex-dnd",
      type: "umd",
      export: "default",
    },
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
});
