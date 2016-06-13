/* eslint-disable */
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var commonResolve = {
  modulesDirectories: ['shared', 'node_modules'],
  extensions: ['', '.js', '.jsx', '.json']
};

var commonLoaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      cacheDirectory: true,
      presets: ['react', 'es2015', 'stage-0'],
      plugins: [
        'transform-decorators-legacy',
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
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
];

module.exports = [
  {
    name: 'Client side',
    entry: {
      admin: ['./lib/client/admin.js'],
      auth: ['./lib/client/auth.js'],
      public: ['./lib/client/public.js']
    },
    output: {
      path: './public/assets',
      filename: '[name].js',
      publicPath: '/public/'
    },
    resolve: commonResolve,
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public']),
      new CopyWebpackPlugin([
        {context: 'assets', from: '**/*', to: '../'} // `to` is relative to output.path
      ]),
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
      new ExtractTextPlugin('[name].css', {allChunks: true})
    ],
    module: {
      loaders: commonLoaders.concat(
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less', {
            publicPath: '../css/'
          })
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss', {
            publicPath: '../css/'
          })
        }
      )
    },
    postcss: function () {
      return [autoprefixer];
    }
  },
  {
    name: 'Server side',
    entry: './app.js',
    output: {
      path: path.join(__dirname, '..', '..', 'build'),
      filename: 'app.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false
    },
    resolve: commonResolve,
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin('[name].css', {allChunks: true})
    ],
    module: {
      loaders: commonLoaders.concat(
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css!postcss')
        }
      )
    },
    postcss: function () {
      return [autoprefixer];
    }
  }
];
