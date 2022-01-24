const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
    mode: 'production',
    entry: path.join(__dirname, "../src/index.js"),
    output: {
        path: path.join(__dirname, "../dist/"),
        filename: "index.js",
        libraryTarget: 'umd', // 采用通用模块定义
        libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    externals: {
        "react": {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
};

module.exports = merge(prodConfig, baseConfig);