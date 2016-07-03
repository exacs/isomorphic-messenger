/**
 * Webpack configuration file for Client in DEVELOP envs
 *
 * Compiles "client/index.js" into "public/bundle.js"
 */
'use strict';

const path    = require('path');
const base    = require('./webpack.config.js');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',

  output: {
    path:     path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },

  resolve: Object.assign({}, base.resolve),

  module: {
    loaders: base.module.loaders.concat(
      {
        test: /.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]!sass-loader',
      }
    ),
  },
};
