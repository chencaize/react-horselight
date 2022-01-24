const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const htmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: "development",
    entry: path.join(__dirname, "../test/index.js"),
    output: {
        path: path.join(__dirname, "../test/"),
        filename: "bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "../test/index.html"),
            filename: "index.html"
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../test'),
        },
        compress: true,
        port: 3001,
        open: true
    },
}

module.exports = merge(devConfig, baseConfig);