/* 开发环境 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const cssConfig = require('./css.config');
const sassConfig = require('./sass.config');
const lessConfig = require('./less.config');

/* 合并配置 */
module.exports = config({
  entry: {
    // 热部署模块
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=500&reload=true',
      path.join(__dirname, '../src/entry/app.dev.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'script/[name].js',
    chunkFilename: 'script/[name]_chunk.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { // sass
        test: /^.*\.sass$/,
        use: ['style-loader', cssConfig, sassConfig]
      },
      { // less(for antd)
        test: /^.*\.(less|css)$/,
        use: ['style-loader', 'css-loader', lessConfig],
        include: /node_modules/
      }
    ]
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html模板
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: path.join(__dirname, '../src/index.pug')
    })
  ]
});