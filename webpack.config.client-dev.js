/**
 * Webpack configuration file for Client in DEVELOP envs
 *
 * Compiles "client/index.js" into "public/bundle.js"
 */
'use strict';

const path    = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',

  output: {
    path:     path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'app', 'sass'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]!sass-loader',
      }
    ]
  },
}
