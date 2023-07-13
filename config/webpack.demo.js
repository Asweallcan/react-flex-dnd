const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base");

module.exports = (env, argv) => {
  return merge(baseConfig, {
    entry: path.resolve(__dirname, "../demo/index.tsx"),
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, "../demo_dist"),
      filename: "index.[contenthash].js",
      publicPath: argv.mode === "development" ? undefined : "./demo_dist/",
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
        title: "react flex dnd demo",
        template: path.resolve(__dirname, "../demo/public/index.html"),
        filename: "index.html",
        inject: true,
      }),
    ],
    devServer: {
      host: "localhost",
      port: "9999",
    },
  });
};
