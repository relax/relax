import 'babel-polyfill';

import mongoose from 'mongoose';

import app from './lib/server';
import config from './config';
import logger from './lib/server/logger';
import migrate from './lib/server/migrate';
import padStart from 'lodash/padStart';

const outline = padStart('', 20, '-');
logger.debug(`\n${outline}\nRelax Status\n${outline}`);

// Connect mongoose
if (!config.db) {
  throw new Error('DB: Configuration for MongoDB required');
}
mongoose.Promise = global.Promise; // Use native promises
mongoose.connect(config.db.uri, config.db, (err) => {
  if (err) {
    logger.debug('DB: Not Connected');
  }else{
    logger.debug('DB: Connected');
  }
});


// Run migrations
migrate()
  .then(() => {
    // Start server
    const server = app.listen(config.port, () => {
      const port = server.address().port;
      logger.debug('URL: http://localhost:%s', port);
      logger.debug('PORT: %s', port);
    });
  })
  .done();
