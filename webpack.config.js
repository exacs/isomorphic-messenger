/**
 * Webpack base configuration file
 *
 * Set up all variables
 */

'use strict';

module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'app', 'sass'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
};
