var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './app.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'app.js'
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false
    })
  ],
  devtool: 'sourcemap',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
};
