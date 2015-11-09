import mongoose from 'mongoose';

import app from './lib/server';
import config from './config';
import logger from './lib/server/logger';
import migrate from './lib/server/migrate';

// Connect mongoose
if (!config.db) {
  throw new Error('Configuration to MongoDB required');
}
mongoose.connect(config.db.uri, config.db);

// Run migrations
migrate()
  .then(() => {
    // Start server
    var server = app.listen(config.port, () => {
      var port = server.address().port;
      logger.debug('Listening at port', port);
    });
  })
  .done();
