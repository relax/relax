import {Router} from 'express';
import Q from 'q';

import usersStore from '../stores/users';
import pagesStore from '../stores/pages';
import mediaStore from '../stores/media';
import settingsStore from '../stores/settings';
import colorsStore from '../stores/colors';
import schemasStore from '../stores/schemas';
import elementsStore from '../stores/elements';
import schemaEntriesStoreFactory from '../stores/schema-entries';
import tabsStore from '../stores/tabs';
import draftsStore from '../stores/drafts';

import generalSettingsIds from '../../settings/general';
import fontSettingsIds from '../../settings/fonts';

var adminRouter = new Router();


// Restrict from here onwards
adminRouter.use('/admin*', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.header.push({
      tag: 'link',
      props: {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
      }
    });
    res.locals.footer.push({
      tag: 'script',
      props: {
        src: '/js/admin.js'
      }
    });
    res.locals.user = req.user;
    res.locals.tabs = [];

    tabsStore
      .findAll({
        query: {
          userId: req.user._id
        },
        populate: {
          path: 'pageId',
          select: 'title slug'
        }
      })
      .then((tabs) => {
        res.locals.tabs = tabs;
      })
      .fin(() => {
        return next();
      });
  } else {
    res.redirect('/admin/login');
  }
});

// Logout
adminRouter.get('/admin/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

// Settings
adminRouter.get('/admin', (req, res, next) => {
  settingsStore
    .findByIds(generalSettingsIds)
    .then((settings) => {
      res.render('admin/index.jsx', {
        activePanelType: 'settings',
        settings
      });
    })
    .catch(next);
});

// Pages list
adminRouter.get('/admin/pages', (req, res, next) => {
  pagesStore
    .findAll(req.query)
    .then((pages) => {
      res.render('admin/index.jsx', {
        activePanelType: 'pages',
        pages: pages,
        query: req.query
      });
    })
    .catch(next);
});

// Page new
adminRouter.get('/admin/pages/new', (req, res, next) => {
  res.render('admin/index.jsx', {
    activePanelType: 'page',
    breadcrumbs: [
      {
        label: 'Pages',
        type: 'pages',
        link: '/admin/pages'
      },
      {
        label: 'New'
      }
    ]
  });
});

// Page edit
adminRouter.get('/admin/pages/:slug', (req, res, next) => {
  pagesStore
    .findBySlug(req.params.slug)
    .then((page) => {
      res.render('admin/index.jsx', {
        activePanelType: 'page',
        page,
        breadcrumbs: [
          {
            label: 'Pages',
            type: 'pages',
            link: '/admin/pages'
          },
          {
            label: page.title
          }
        ]
      });
    })
    .catch(next);
});

// Page build
adminRouter.get('/admin/page/:slug', (req, res, next) => {
  Q
    .all([
      pagesStore.findBySlug(req.params.slug),
      elementsStore.findAll(),
      colorsStore.findAll()
    ])
    .spread((page, elements, colors) => {
      Q()
        .then(() => {
          var deferred = Q.defer();

          draftsStore
            .findById({
              _pageId: page._id,
              _userId: req.user._id
            })
            .then((draft) => {
              if (draft.actions.length === 0) {
                draft._version = page._version;
                draft.data = page.data;
              }

              deferred.resolve(draft);
            })
            .catch(() => {
              draftsStore
                .add({
                  _id: {
                    _pageId: page._id,
                    _userId: req.user._id
                  },
                  _version: page._version,
                  data: page.data
                })
                .then(deferred.resolve);
            });

          return deferred.promise;
        })
        .then((draft) => {
          res.render('admin/index.jsx', {
            activePanelType: 'pageBuild',
            elements,
            page,
            draft,
            colors
          });
        });
    })
    .catch(next);
});

// Media list
adminRouter.get('/admin/media', (req, res, next) => {
  mediaStore
    .findAll(req.query)
    .then((media) => {
      res.render('admin/index.jsx', {
        activePanelType: 'media',
        media: media,
        query: req.query
      });
    })
    .catch(next);
});

// Fonts list
adminRouter.get('/admin/fonts', (req, res, next) => {
  settingsStore
    .findByIds(fontSettingsIds)
    .then((settings) => {
      res.render('admin/index.jsx', {
        activePanelType: 'fonts',
        settings
      });
    })
    .catch(next);
});

// Colors list
adminRouter.get('/admin/colors', (req, res, next) => {
  colorsStore
    .findAll()
    .then((colors) => {
      res.render('admin/index.jsx', {
        activePanelType: 'colors',
        colors
      });
    })
    .catch(next);
});

// Schemas new
adminRouter.get('/admin/schemas/new', (req, res, next) => {
  res.render('admin/index.jsx', {
    activePanelType: 'schemasManage',
    breadcrumbs: [
      {
        label: 'Schemas',
        type: 'schemas',
        link: '/admin/schemas'
      },
      {
        label: 'New'
      }
    ]
  });
});

// Schemas edit
adminRouter.get('/admin/schemas/:slug', (req, res, next) => {
  schemasStore.findBySlug(req.params.slug)
    .then((schema) => {
      res.render('admin/index.jsx', {
        activePanelType: 'schemasManage',
        schema,
        breadcrumbs: [
          {
            label: 'Schemas',
            type: 'schemas',
            link: '/admin/schemas'
          },
          {
            label: schema.title
          }
        ]
      });
    })
    .catch(next);
});

// Schemas list
adminRouter.get('/admin/schemas', (req, res, next) => {
  schemasStore
    .findAll(req.query)
    .then((schemas) => {
      res.render('admin/index.jsx', {
        activePanelType: 'schemas',
        schemas,
        query: req.query
      });
    })
    .catch(next);
});

// Schema new entry
adminRouter.get('/admin/schema/:slug/new', (req, res, next) => {
  schemasStore.findBySlug(req.params.slug)
    .then((schema) => {
      res.render('admin/index.jsx', {
        activePanelType: 'schemaEntry',
        schema,
        breadcrumbs: [
          {
            label: 'Schemas',
            type: 'schemas',
            link: '/admin/schemas'
          },
          {
            label: schema.title,
            link: '/admin/schema/'+req.params.slug
          },
          {
            label: 'New'
          }
        ]
      });
    })
    .catch(next);
});

// Schema edit entry
adminRouter.get('/admin/schema/:slug/:entrySlug', (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntriesStore) => Q.all([
      schemaEntriesStore.findBySlug(req.params.entrySlug),
      schemasStore.findBySlug(req.params.slug)
    ]))
    .spread((schemaEntry, schema) => {
      res.render('admin/index.jsx', {
        activePanelType: 'schemaEntry',
        schemaEntry,
        schema,
        breadcrumbs: [
          {
            label: 'Schemas',
            type: 'schemas',
            link: '/admin/schemas'
          },
          {
            label: schema.title,
            link: '/admin/schema/'+schema.slug
          },
          {
            label: schemaEntry.title
          }
        ]
      });
    })
    .catch(next);
});

// Schema entries list
adminRouter.get('/admin/schema/:slug', (req, res, next) => {
  schemaEntriesStoreFactory(req.params.slug)
    .then((schemaEntriesStore) => Q.all([
      schemaEntriesStore.findAll(req.query),
      schemasStore.findBySlug(req.params.slug)
    ]))
    .spread((schemaEntries, schema) => {
      res.render('admin/index.jsx', {
        activePanelType: 'schema',
        schemaEntries,
        schema,
        query: req.query,
        breadcrumbs: [
          {
            label: 'Schemas',
            type: 'schemas',
            link: '/admin/schemas'
          },
          {
            label: schema.title
          }
        ]
      });
    })
    .catch(next);
});

// Users list
adminRouter.get('/admin/users', (req, res, next) => {
  usersStore
    .findAll(req.query)
    .then((users) => {
      res.render('admin/index.jsx', {
        activePanelType: 'users',
        users: users,
        query: req.query
      });
    })
    .catch(next);
});

// User profile
adminRouter.get('/admin/users/:username', (req, res, next) => {
  usersStore
    .findOne({username: req.params.username})
    .then((editUser) => {
      res.render('admin/index.jsx', {
        activePanelType: 'userEdit',
        editUser,
        breadcrumbs: [
          {
            label: 'Users',
            type: 'users',
            link: '/admin/users'
          },
          {
            label: editUser.name
          }
        ]
      });
    })
    .catch(next);
});


export default adminRouter;
