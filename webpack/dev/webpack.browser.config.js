/* eslint-disable */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../../config');
var autoprefixer = require('autoprefixer');

var NoErrorsPlugin = webpack.NoErrorsPlugin;
var optimize = webpack.optimize;

var webpackConfig = module.exports = {
  entry: {
    admin: ['./lib/client/admin.js'],
    auth: ['./lib/client/auth.js'],
    public: ['./lib/client/public.js']
  },
  output: {
    path: './public/assets',
    filename: '[name].js',
    publicPath: 'http://localhost:' + config.devPort + '/assets/'
  },
  devtool: 'eval',
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public']),
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*', to: '../' } // `to` is relative to output.path
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
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
          plugins: [
            'transform-decorators-legacy',
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
          }]]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(css|less)$/,
        loader: 'style!css-loader?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!less'
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  devServer: {
    port: config.devPort,
    contentBase: 'http://localhost:' + config.port,
    outputPath: 'public/assets'
  }
};
