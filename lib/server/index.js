import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import express from 'express';
import forEach from 'lodash/forEach';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import getSettings from 'helpers/get-settings';
import passport from 'passport';
import path from 'path';
import safeHtmlString from 'helpers/safe-html-string';
import session from 'express-session';
import {
  favicon,
  title,
  description,
  keywords,
  copyright,
  robots
} from 'statics/settings-keys';

import config from '../../config';
import middleware from './middleware';
import routers from './routers';
import schema from './schema';

const app = express();

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));

// View engine
app.set('views', path.join(__dirname, 'components'));

// session
const MongoStore = connectMongo(session);
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.resolve('public')));

// Maintenance
app.use(middleware.maintenance);

app.use(['/favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
  res.status(404).end();
});

// Multer
app.use('/graphql', multer({dest: './uploads/'}).single('file'));

// GraphqQL server
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema.getSchema(),
  rootValue: {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    file: req.file
  },
  graphiql: true
})));

app.use(async (req, res, next) => {
  const metaSettings = {
    description,
    keywords,
    copyright,
    robots,
    dctitle: 'DC.title'
  };

  const settings = await getSettings([title, favicon, ...Object.keys(metaSettings)]);

  res.locals.header = [
    {
      tag: 'title',
      content: settings.title && safeHtmlString(settings.title) || 'Relax CMS'
    }
  ];

  forEach(metaSettings, (value, key) => {
    if (settings[key]) {
      res.locals.header.push({
        tag: 'meta',
        props: {
          name: value,
          content: safeHtmlString(settings[key])
        }
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    res.baseScriptsURL = `http://localhost:${config.devPort}`;
    res.locals.header.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/webpack-dev-server.js`
      }
    });
  } else {
    res.baseScriptsURL = '';
  }

  // footer
  res.locals.footer = [{
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/assets/common.js`
    }
  }];

  next();
});

app.use(middleware.fonts);
app.use(middleware.googleAnalytics);

app.use(routers.mediaRouter);
app.use(routers.authRouter);
app.use(routers.adminRouter);
app.use(routers.publicRouter);

app.use((req, res) => {
  res.status(404).end();
});

app.use((error, req, res) => {
  const statusCode = error.statusCode || 500;
  const err = {
    error: statusCode,
    message: error.message
  };
  if (!res.headersSent) {
    res.status(statusCode).send(err);
  }
});

export default app;
