import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './config';
import webpackConfig from './webpack.config';

new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.resolve(__dirname, 'public'),
  hot: true,
  historyApiFallback: true
})
  .listen(config.devPort, '0.0.0.0', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:8080');
  });
