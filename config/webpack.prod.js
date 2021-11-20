const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.ts"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js",
    library: {
      name: "react-flex-dnd",
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
          { loader: "ts-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
};
