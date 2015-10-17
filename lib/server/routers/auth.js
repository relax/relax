import passport from 'passport';
import {Router} from 'express';

import UserModel from '../models/user';

const authRouter = new Router();

function injectScript (req, res, next) {
  res.locals.footer.push({
    tag: 'script',
    props: {
      src: '/js/auth.js'
    }
  });
  next();
}

// Register
authRouter.get('/admin/init', injectScript, async (req, res, next) => {
  try {
    const count = await UserModel.count().exec();

    if (count === 0) {
      // TODO Server side rendering
      res.render('button.jsx', {});
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

authRouter.post('/admin/init', (req, res, next) => {
  // Q()
  //   .then(() => usersStore.count())
  //   .then((number) => {
  //     if (number === 0) {
  //       return usersStore
  //         .add(req.body)
  //         .then((user) => {
  //           res.status(200).send(user);
  //         });
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch(next);
});

// Login
authRouter.get('/admin/login', injectScript, (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('admin/login.jsx', {
      user: req.user
    });
  }
});

authRouter.post('/admin/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/admin');
});

export default authRouter;
