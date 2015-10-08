import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import reactEngine from 'express-react-engine';
import routers from './routers';
import './stores';
import settingsStore from './stores/settings';
import mediaStore from './stores/media';
import forEach from 'lodash.foreach';
import session from 'express-session';
import connectMongo from 'connect-mongo';

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

app.use((req, res, next) => {
  settingsStore
  .findAll()
  .then((settings) => {
    settings = settingsStore.parseSettings(settings);

    // header
    res.locals.header = [
      {
        tag: 'title',
        content: settings.title
      },
      {
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/css/main.css'
        }
      },
      {
        tag: 'link',
        props: {
          rel: 'stylesheet',
          type: 'text/css',
          href: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
        }
      },
      {
        tag: 'script',
        props: {
          src: '//ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js'
        }
      },
      {
        tag: 'link',
        props: {
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
          rel: 'stylesheet'
        }
      }
    ];

    if (settings.googleAnalytics && settings.googleAnalytics !== '') {
      res.locals.header.push({
        tag: 'script',
        content: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', '${settings.googleAnalytics}', 'auto');
        `
      });
    }


    // Custom fonts
    if (settings.fonts && settings.fonts.customFonts) {
      const customFonts = settings.fonts.customFonts;

      var css = '';
      forEach(customFonts, (customFont) => {
        const family = customFont.family;
        const map = customFont.files;
        const location = '/fonts/'+customFont.id+'/';

        css += '@font-face {';
        css += 'font-family: "'+family+'";';
        css += 'src: url("'+location+map.eot+'"); ';
        css += 'src: ';

        // try woff2
        if (map.woff2) {
          css += 'url("'+location+map.woff2+'"), ';
        }

        css += 'url("'+location+map.woff+'"), ';
        css += 'url("'+location+map.ttf+'"); ';

        css += '}';
      });

      res.locals.header.push({
        tag: 'style',
        props: {
          type: 'text/css'
        },
        content: css
      });

      if (settings.fonts.webfontloader) {
        res.locals.header.push({
          tag: 'script',
          content: 'WebFont.load('+JSON.stringify(settings.fonts.webfontloader)+');'
        });
      }
    }

    // footer
    res.locals.footer = [{
      tag: 'script',
      props: {
        src: '/js/common.js'
      }
    }];

    if (settings.favicon && settings.favicon !== '') {
      mediaStore
        .findById(settings.favicon)
        .then((favicon) => {
          res.locals.header.push({
            tag: 'link',
            props: {
              rel: 'icon',
              type: favicon.type,
              href: favicon.url
            }
          });
        })
        .fin(() => {
          next();
        });
    } else {
      next();
    }
  })
  .catch(() => {
    res.status(404).end();
  });
});

// Block access to API endpoints when user is not authenticated
app.use('/api*', (req, res, next) => {
  if (req.method !== 'GET' && !req.isAuthenticated()) {
    res.status(401).send();
  } else {
    next();
  }
});

(function iterateRouters (routers) {
  for (let key in routers) {
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
