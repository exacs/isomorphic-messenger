/**
 * Webpack configuration file for Client in PRODUCTION envs
 *
 * Compiles "client/index.js" into "public/bundle.js" and "main.css"
 */

'use strict';

const path    = require('path');
const webpack = require('webpack');
const base    = require('./webpack.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',

  output: {
    path:     path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },

  resolve: Object.assign({}, base.resolve),

  module: {
    loaders: base.module.loaders.concat(
      {
        test: /.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!sass-loader'),
      }
    ),
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
};
