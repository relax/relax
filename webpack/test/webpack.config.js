/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var optimize = webpack.optimize;

var webpackConfig = module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'cheap-module-source-map',
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(less|css)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'null-loader'
      }
    ]
  }
};
