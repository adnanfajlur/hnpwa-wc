const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const GLOBALS = {
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
};

module.exports = merge(config, {
  devtool: "nosources-source-map",
  entry: {
    application: ["src/js/index"],
    vendor: [
      "@webcomponents/webcomponentsjs/custom-elements-es5-adapter",
      "@webcomponents/webcomponentsjs/webcomponents-loader",
      "@0xcda7a/redux-es6",
      "redux-thunk"
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/assets/images"),
        to: "images"
      }
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
  module: {
    noParse: /\.min\.js$/
  }
});