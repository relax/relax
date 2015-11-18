var webpack = require('webpack');
var config = require('./config');

var NoErrorsPlugin = webpack.NoErrorsPlugin;
var optimize = webpack.optimize;

module.exports = {
  devtool: 'eval',
  entry: {
    admin: ['./lib/client/admin.js'],
    auth: ['./lib/client/auth.js'],
    public: ['./lib/client/public.js']
  },
  output: {
    path: './public/js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public']),
    new NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
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
        test: /\.(less|css)$/,
        loader: 'style!css!less!autoprefixer'
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
    contentBase: `http://localhost:${config.port}`
  }
};
