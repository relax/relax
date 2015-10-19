import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import reactEngine from 'express-react-engine';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import passport from 'passport';


import routers from './routers';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import schema from './schema';
import middleware from './middleware';

var app = express();

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));

// View engine
app.set('views', path.join(__dirname, '../components'));
app.engine('jsx', reactEngine({wrapper: 'html.jsx', babel: false}));

// session
var MongoStore = connectMongo(session);
app.use(session({
  secret: 'Is very secret',
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use('/', express.static(path.join(__dirname, '../../public')));

// Multer
const storage = multer.memoryStorage();
app.use('/graphql', multer({storage}).array('files'));

// GraphqQL server
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema.getSchema(),
  rootValue: {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    files: req.files
  },
  graphiql: true
})));

app.use((req, res, next) => {
  // header
  res.locals.header = [
    {
      tag: 'title',
      content: 'Admin'
    },
    {
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
      }
    }
  ];

  // footer
  res.locals.footer = [{
    tag: 'script',
    props: {
      src: '/js/common.js'
    }
  }];

  next();
});

app.use(middleware.fonts);

(function iterateRouters (routers) {
  for (const key in routers) {
    if (Object.getPrototypeOf(routers[key]).route) {
      app.use('/', routers[key]);
    } else {
      iterateRouters(routers[key]);
    }
  }
})(routers);

app.use((req, res, next) => {
  res.status(404).end();
});

app.use((error, req, res) => {
  var statusCode = error.statusCode || 500;
  var err = {
    error: statusCode,
    message: error.message
  };
  if (!res.headersSent) {
    res.status(statusCode).send(err);
  }
});

export default app;
