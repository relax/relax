var rc = require('rc');

module.exports = rc('relax', {
  port: process.env.PORT || 8080,
  devPort: process.env.DEV_PORT || 8181,
  db: {
    uri: process.env.RELAX_MONGO_URI || 'mongodb://localhost/relax'
  },
  session: {
    secret: process.env.RELAX_SESSION_SECRET || 'Is very secret'
  },
  logger: {
    transports: {
      Console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      }
    },
    exitOnError: false
  },
  mail: {
    settings: {
      mailService: process.env.RELAX_MAIL_SERVICE,
      mailUser: process.env.RELAX_MAIL_USERNAME,
      mailPass: process.env.RELAX_MAIL_PASSWORD,
      mailFrom: process.env.RELAX_MAIL_SENDER_EMAIL
    }
  }
});
