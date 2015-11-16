import {join} from 'path';
import {
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  DefinePlugin,
  optimize
} from 'webpack';

import config from './config';

// import babelConfig from './.babelrc';

module.exports = {
  // devtool: 'eval',
  entry: {
    admin: join(__dirname, '/lib/client/admin.js'),
    auth: join(__dirname, '/lib/client/auth.js'),
    public: join(__dirname, '/lib/client/public.js'),
    // devServer: `webpack-dev-server/client?http://0.0.0.0:${config.devPort}`,
    // hotPlug: 'webpack/hot/only-dev-server',
    // server: join(__dirname, 'index.js')
  },
  output: {
    path: join(__dirname, '/public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin(),
    new optimize.CommonsChunkPlugin('common.js', ['admin', 'auth', 'public']),
    // new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    // new DefinePlugin({
    //   __DEVELOPMENT__: true,
    //   __DEVTOOLS__: false
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        // include: [join(__dirname, 'index.js'), join(__dirname, 'lib')],
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      // {
      //   test: /\.(less|css)$/,
      //   include: [join(__dirname, 'assets/less')],
      //   loader: 'style!css!less!autoprefixer'
      // }
    ]
  }
};
