import app from './lib/server';
import config from './config';
import mongoose from 'mongoose';
import logger from './lib/logger';

// Connect mongoose
if (!config.db) {
  throw new Error('Configuration to MongoDB required');
}
mongoose.connect(config.db.uri, config.db);

// Start server
var server = app.listen(config.port, () => {
   var port = server.address().port;
   logger.debug('Listening at port', port);
});
