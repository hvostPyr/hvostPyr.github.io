const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].bundle.js',
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html"
    }),
    new HtmlWebpackPlugin({
        template: "./public/level1.html",
        filename: "level1.html"
    }),
    new HtmlWebpackPlugin({
        template: "./public/level2.html",
        filename: "level2.html"
    }),
    new HtmlWebpackPlugin({
        template: "./public/level3.html",
        filename: "level3.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = () => config;