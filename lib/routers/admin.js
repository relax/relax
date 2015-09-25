import Q from 'q';
import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import generalSettingsIds from '../settings/general';
import fontSettingsIds from '../settings/fonts';

export default [

  // Settings
  {
    path: 'admin',
    callback: (stores, render, req, next) => {
      stores.settings
        .findByIds(generalSettingsIds)
        .then((settings) => {
          render({
            activePanelType: 'settings',
            settings
          });
        })
        .catch(next);
    }
  },

  // Pages list
  {
    path: 'admin/pages',
    callback: (stores, render, req, next) => {
      let query = (req.query.order && req.query) || {
        sort: '_id',
        order: 'desc'
      };
      stores.pages
        .findAll(query)
        .then((pages) => {
          render({
            activePanelType: 'pages',
            pages: pages,
            query: query
          });
        })
        .catch(next);
    }
  },

  // Pages new
  {
    path: 'admin/pages/new',
    callback: (stores, render, req, next) => {
      render({
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
    }
  },

  // Page edit
  {
    path: 'admin/pages/:slug',
    callback: (stores, render, req, next) => {
      stores.pages
        .findBySlug(req.params.slug)
        .then((page) => {
          render({
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
    }
  },

  // Page build
  {
    path: 'admin/page/:slug',
    callback: (stores, render, req, next) => {
      Q
        .all([
          stores.pages.findBySlug(req.params.slug),
          stores.elements.findAll(),
          stores.colors.findAll(),
          stores.styles.findAll()
        ])
        .spread((page, elements, colors, styles) => {
          var inTabs = false;
          forEach(req.locals.tabs, (tab) => {
            if (String(tab._id._id) === String(page._id)) {
              inTabs = true;
              return false;
            }
          });

          if (!inTabs) {
            stores.tabs.add({
              _id: {
                _id: page._id,
                _userId: req.locals.user._id
              },
              page: page._id
            });
          }

          Q()
            .then(() => {
              var deferred = Q.defer();

              stores.drafts
                .findById({
                  _pageId: page._id,
                  _userId: req.locals.user._id
                })
                .then((draft) => {
                  if (draft.actions.length === 0) {
                    draft.__v = page.__v;
                    draft.data = page.data;
                  }

                  deferred.resolve(draft);
                })
                .catch(() => {
                  stores.drafts
                    .add({
                      _id: {
                        _pageId: page._id,
                        _userId: req.locals.user._id
                      },
                      __v: page.__v,
                      data: page.data
                    })
                    .then(deferred.resolve);
                });

              return deferred.promise;
            })
            .then((draft) => {
              render({
                activePanelType: 'pageBuild',
                elements,
                page,
                draft,
                colors,
                styles
              });
            });
        })
        .catch(next);
    }
  },

  // Media list
  {
    path: 'admin/media',
    callback: (stores, render, req, next) => {
      let query = merge({
        sort: '_id',
        order: 'desc',
        page: 1,
        limit: 12
      }, req.query);

      query.limit = parseInt(query.limit, 10);
      query.page = parseInt(query.page, 10);

      Q
        .all([
          stores.media.findAll(query),
          stores.media.count()
        ])
        .spread((media, count) => {
          render({
            activePanelType: 'media',
            media,
            count,
            query
          });
        })
        .catch(next);
    }
  },

  // Fonts list
  {
    path: 'admin/fonts',
    callback: (stores, render, req, next) => {
      stores.settings
        .findByIds(fontSettingsIds)
        .then((settings) => {
          render({
            activePanelType: 'fonts',
            settings
          });
        })
        .catch(next);
    }
  },

  // Colors list
  {
    path: 'admin/colors',
    callback: (stores, render, req, next) => {
      stores.colors
        .findAll()
        .then((colors) => {
          render({
            activePanelType: 'colors',
            colors
          });
        })
        .catch(next);
    }
  },

  // Schemas new
  {
    path: 'admin/schemas/new',
    callback: (stores, render, req, next) => {
      render({
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
    }
  },

  // Schemas edit
  {
    path: 'admin/schemas/:slug',
    callback: (stores, render, req, next) => {
      stores.schemas
        .findBySlug(req.params.slug)
        .then((schema) => {
          render({
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
    }
  },

  // Schemas list
  {
    path: 'admin/schemas',
    callback: (stores, render, req, next) => {
      let query = (req.query.order && req.query) || {
        sort: '_id',
        order: 'desc'
      };
      stores.schemas
        .findAll(query)
        .then((schemas) => {
          render({
            activePanelType: 'schemas',
            schemas,
            query
          });
        })
        .catch(next);
    }
  },

  // Schema template build
  {
    path: 'admin/schemas/:slug/template',
    callback: (stores, render, req, next) => {
      Q
        .all([
          stores.schemas.findBySlug(req.params.slug),
          stores.elements.findAll(),
          stores.colors.findAll(),
          stores.styles.findAll()
        ])
        .spread((schema, elements, colors, styles) => {
          var inTabs = false;
          forEach(req.locals.tabs, (tab) => {
            if (String(tab._id._id) === String(schema._id)) {
              inTabs = true;
              return false;
            }
          });

          if (!inTabs) {
            stores.tabs.add({
              _id: {
                _id: schema._id,
                _userId: req.locals.user._id
              },
              userSchema: schema._id
            });
          }

          Q()
            .then(() => {
              var deferred = Q.defer();

              stores.drafts
                .findById({
                  _pageId: schema._id,
                  _userId: req.locals.user._id
                })
                .then((draft) => {
                  if (draft.actions.length === 0) {
                    draft.__v = schema.__v;
                    draft.data = cloneDeep(schema.data);
                    draft.schemaLinks = cloneDeep(schema.schemaLinks || {});
                  }
                  deferred.resolve(draft);
                })
                .catch(() => {
                  stores.drafts
                    .add({
                      _id: {
                        _pageId: schema._id,
                        _userId: req.locals.user._id
                      },
                      __v: schema.__v,
                      data: cloneDeep(schema.data),
                      schemaLinks: cloneDeep(schema.schemaLinks || {})
                    })
                    .then(deferred.resolve);
                });

              return deferred.promise;
            })
            .then((draft) => {
              render({
                activePanelType: 'pageBuild',
                elements,
                schema,
                draft,
                colors,
                styles
              });
            });
        })
        .catch(next);
    }
  },

  // Schema new entry
  {
    path: 'admin/schema/:slug/new',
    callback: (stores, render, req, next) => {
      stores.schemas
        .findBySlug(req.params.slug)
        .then((schema) => {
          render({
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
    }
  },

  // Schema edit entry
  {
    path: 'admin/schema/:slug/:entrySlug',
    callback: (stores, render, req, next) => {
      Q()
        .then(() => stores.schemaEntries(req.params.slug))
        .then((schemaEntriesStore) => Q.all([
          schemaEntriesStore.findBySlug(req.params.entrySlug),
          stores.schemas.findBySlug(req.params.slug)
        ]))
        .spread((schemaEntry, schema) => {
          render({
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
                label: schemaEntry._title
              }
            ]
          });
        })
        .catch(next);
    }
  },

  // Schema entry single build
  {
    path: 'admin/schema/:slug/:entrySlug/single',
    callback: (stores, render, req, next) => {
      Q()
        .then(() => stores.schemaEntries(req.params.slug))
        .then((schemaEntriesStore) => Q.all([
          schemaEntriesStore.findBySlug(req.params.entrySlug),
          stores.schemas.findBySlug(req.params.slug),
          stores.elements.findAll(),
          stores.colors.findAll(),
          stores.styles.findAll()
        ]))
        .spread((schemaEntry, schema, elements, colors, styles) => {
          var inTabs = false;
          forEach(req.locals.tabs, (tab) => {
            if (String(tab._id._id) === String(schemaEntry._id)) {
              inTabs = true;
              return false;
            }
          });

          if (!inTabs) {
            stores.tabs.add({
              _id: {
                _id: schemaEntry._id,
                _userId: req.locals.user._id
              },
              schemaEntry: {
                _id: schemaEntry._id,
                title: schemaEntry._title,
                slug: schemaEntry._slug,
                schemaSlug: schema.slug
              }
            });
          }

          Q()
            .then(() => {
              var deferred = Q.defer();

              stores.drafts
                .findById({
                  _pageId: schemaEntry._id,
                  _userId: req.locals.user._id
                })
                .then((draft) => {
                  if (draft.actions.length === 0) {
                    draft.__v = schemaEntry.__v;
                    draft.data = cloneDeep(schemaEntry._data);
                    draft.schemaLinks = cloneDeep(schemaEntry._schemaLinks);
                  }
                  deferred.resolve(draft);
                })
                .catch(() => {
                  let addDraft = {
                    _id: {
                      _pageId: schemaEntry._id,
                      _userId: req.locals.user._id
                    },
                    __v: schemaEntry.__v
                  };
                  if (schemaEntry.data && schemaEntry.data.length > 0) {
                    addDraft.data = cloneDeep(schemaEntry._data);
                    addDraft.schemaLinks = cloneDeep(schemaEntry._schemaLinks || {});
                  } else {
                    addDraft.data = cloneDeep(schema.data);
                    addDraft.schemaLinks = cloneDeep(schema.schemaLinks);
                  }

                  stores.drafts
                    .add(addDraft)
                    .then(deferred.resolve);
                });

              return deferred.promise;
            })
            .then((draft) => {
              render({
                activePanelType: 'pageBuild',
                elements,
                schema,
                schemaEntry,
                draft,
                colors,
                styles
              });
            });
        })
        .catch(next);
    }
  },

  // Schema entries list
  {
    path: 'admin/schema/:slug',
    callback: (stores, render, req, next) => {
      let query = (req.query.order && req.query) || {
        sort: '_id',
        order: 'desc'
      };
      Q()
        .then(() => stores.schemaEntries(req.params.slug))
        .then((schemaEntriesStore) => Q.all([
          schemaEntriesStore.findAll(query),
          stores.schemas.findBySlug(req.params.slug)
        ]))
        .spread((schemaEntries, schema) => {
          render({
            activePanelType: 'schema',
            schemaEntries,
            schema,
            query,
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
    }
  },

  // Users list
  {
    path: 'admin/users',
    callback: (stores, render, req, next) => {
      let query = (req.query.order && req.query) || {
        sort: '_id',
        order: 'desc'
      };
      stores.users
        .findAll(query)
        .then((users) => {
          render({
            activePanelType: 'users',
            users,
            query
          });
        })
        .catch(next);
    }
  },

  // User profile
  {
    path: 'admin/users/:username',
    callback: (stores, render, req, next) => {
      stores.users
        .findOne({username: req.params.username})
        .then((editUser) => {
          render({
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
    }
  }
];
