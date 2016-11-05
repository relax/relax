var rc = require('rc');

module.exports = rc('relax', {
  port: process.env.PORT || 8080,
  devPort: process.env.DEV_PORT || 8181,
  db: {
    uri: process.env.RELAX_MONGO_URI || 'mongodb://localhost/relax'
  },
  session: {
    secret: process.env.RELAX_SESSION_SECRET || 'Is very secret'
  }
});
