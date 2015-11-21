var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');

var NoErrorsPlugin = webpack.NoErrorsPlugin;
var optimize = webpack.optimize;

var webpackConfig = module.exports = {
  entry: {
    admin: ['./lib/client/admin.js'],
    auth: ['./lib/client/auth.js'],
    public: ['./lib/client/public.js']
  },
  output: {
    path: './public/js',
    filename: '[name].js',
    publicPath: 'http://localhost:' + config.devPort + '/js/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public'])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          optional: ['runtime'],
          env: {
            development: {
              plugins: [
                'react-transform'
              ],
              extra: {
                'react-transform': {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }
              }
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      }
    ]
  },
  devServer: {
    port: config.devPort,
    contentBase: 'http://localhost:' + config.port
  }
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new ExtractTextPlugin('../css/[name].css'));
  webpackConfig.module.loaders.push({
    test: /\.(less|css)$/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader!less!autoprefixer',
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

  webpackConfig.devtool = 'source-map';
} else {
  webpackConfig.module.loaders.push({
    test: /\.(less|css)$/,
    loader: 'style!css!less!autoprefixer'
  });
  webpackConfig.devtool = 'eval';
}
