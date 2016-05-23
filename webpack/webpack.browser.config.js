/* eslint-disable */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config');
var autoprefixer = require('autoprefixer');

var NoErrorsPlugin = webpack.NoErrorsPlugin;
var optimize = webpack.optimize;

var PRODUCTION = process.env.NODE_ENV === 'production';

var webpackConfig = module.exports = {
  entry: {
    admin: ['./lib/client/admin.js'],
    auth: ['./lib/client/auth.js'],
    public: ['./lib/client/public.js']
  },
  output: {
    path: './public/js',
    filename: '[name].js',
    publicPath: 'http://localhost:' + config[PRODUCTION ? 'port' : 'devPort'] + '/js/'
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public']),
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*', to: '../' } // `to` is relative to output.path
    ])
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
          plugins: ['transform-decorators-legacy'],
          env: {
            development: {
              plugins: [
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
                }]
              ]
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  devServer: {
    port: config.devPort,
    contentBase: 'http://localhost:' + config.port,
    outputPath: 'public/js'
  }
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new ExtractTextPlugin('../css/[name].css', {allChunks: true}));
  webpackConfig.module.loaders.push({
    test: /\.(css|less)$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css!postcss!less',
      {
        publicPath: '../css/'
      }
    )
  });
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        warnings: false
      }
    }),
  	new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new NoErrorsPlugin()
  );

  webpackConfig.devtool = 'cheap-module-source-map';
} else {
  webpackConfig.module.loaders.push({
    test: /\.(css|less)$/,
    loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less'
  });
  webpackConfig.devtool = 'eval';
}
