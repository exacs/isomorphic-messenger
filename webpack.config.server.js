/**
 * Webpack configuration file for Server in PRODUCTION  envs
 *
 * Compiles "server/index.js" into "index.js".
 */
'use strict';

const path    = require('path');
const webpack = require('webpack');
const base    = require('./webpack.config.js');
const fs      = require('fs');

// Specific setup for node.js execution environments
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {nodeModules[mod] = 'commonjs ' + mod;});

module.exports = {
  context: path.join(__dirname, 'server'),
  entry: './index.js',
  target: 'node',

  output: {
    path:     path.join(__dirname),
    filename: 'index.js',
  },

  externals: nodeModules,

  resolve: Object.assign({}, base.resolve),

  module: {
    loaders: base.module.loaders.concat(
      {
        test: /.json$/,
        loaders: ['json-loader'],
      },
      {
        test: /.scss$/,
        loaders: ['css-loader/locals?modules', 'sass-loader'],
      }
    ),
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
};
