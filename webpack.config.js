const path    = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',

  output: {
    path:     path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'app'],
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
}
