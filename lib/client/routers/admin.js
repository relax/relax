import Cortex from 'backbone-cortex';
import Admin from '../../components/admin';
import Q from 'q';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import {Router} from 'relax-framework';

import sessionStore from '../stores/session';
import usersStore from '../stores/users';
import pagesStore from '../stores/pages';
import elementsStore from '../stores/elements';
import mediaStore from '../stores/media';
import settingsStore from '../stores/settings';
import colorsStore from '../stores/colors';
import schemasStore from '../stores/schemas';
import schemaEntriesStoreFactory from '../stores/schema-entries';
import tabsStore from '../stores/tabs';

import generalSettingsIds from '../../settings/general';
import fontSettingsIds from '../../settings/fonts';

var cortex = new Cortex();

function renderComponent (Component, route, params) {
  Router.prototype.renderComponent(Component, merge(route.data, params));
}

cortex.use((route, next) => {
  Q()
    .then(() => sessionStore.getSession())
    .then((user) => {
      route.data.user = user;
      route.data.tabs = [];

      tabsStore
        .findAll({
          user: user._id
        })
        .then((tabs) => {
          route.data.tabs = tabs;
        })
        .fin(next);
    })
    .catch((err) => {
      window.location.href = '/admin/login';
    });
});

cortex.route('admin', (route, next) => {
  settingsStore
    .findByIds(generalSettingsIds)
    .then((settings) => {
      renderComponent(Admin, route, {
        activePanelType: 'settings',
        settings
      });
    })
    .done();
});

cortex.route('admin/pages', (route, next) => {
  let query = route.query || {};

  pagesStore
    .findAll(query)
    .then((pages) => {
      renderComponent(Admin, route, {
        activePanelType: 'pages',
        pages,
        query
      });
    })
    .done();
});

cortex.route('admin/pages/new', (route, next) => {
  renderComponent(Admin, route, {
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

cortex.route('admin/pages/:slug', (route, next) => {
  const slug = route.params.slug;

  pagesStore
    .findBySlug(slug)
    .then((page) => {
      renderComponent(Admin, route, {
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

cortex.route('admin/media', (route, next) => {
  var query = route.query || {};

  mediaStore
    .findAll(query)
    .then((media) => {
      renderComponent(Admin, route, {
        activePanelType: 'media',
        media,
        query
      });
    })
    .done();
});

cortex.route('admin/fonts', (route, next) => {
  settingsStore
    .findByIds(fontSettingsIds)
    .then((settings) => {
      renderComponent(Admin, route, {
        activePanelType: 'fonts',
        settings
      });
    })
    .done();
});

cortex.route('admin/colors', (route, next) => {
  colorsStore
    .findAll()
    .then((colors) => {
      renderComponent(Admin, route, {
        activePanelType: 'colors',
        colors
      });
    })
    .done();
});

cortex.route('admin/schemas/new', (route, next) => {
  renderComponent(Admin, route, {
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

cortex.route('admin/schemas/:slug', (route, next) => {
  const slug = route.params.slug;
  schemasStore.findBySlug(slug)
    .then((schema) => {
      renderComponent(Admin, route, {
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

cortex.route('admin/schema/:slug/new', (route, next) => {
  const slug = route.params.slug;
  const query = route.query || {};

  Q()
    .then(() => schemasStore.findBySlug(slug))
    .then((schema) => {
      renderComponent(Admin, route, {
        activePanelType: 'schemaEntry',
        schema,
        query: query,
        breadcrumbs: [
          {
            label: 'Schemas',
            type: 'schemas',
            link: '/admin/schemas'
          },
          {
            label: schema.title,
            link: '/admin/schema/'+slug
          },
          {
            label: 'New'
          }
        ]
      });
    })
    .catch(next);
});

cortex.route('admin/schema/:slug/:entrySlug', (route, next) => {
  var schemaEntriesStore = schemaEntriesStoreFactory(route.params.slug);

  Q
    .all([
      schemaEntriesStore.findBySlug(route.params.entrySlug),
      schemasStore.findBySlug(route.params.slug)
    ])
    .spread((schemaEntry, schema) => {
      renderComponent(Admin, route, {
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
    .done();
});

cortex.route('admin/schema/:slug', (route, next) => {
  var schemaEntriesStore = schemaEntriesStoreFactory(route.params.slug);
  var query = route.query || {};

  Q
    .all([
      schemaEntriesStore.findAll(query),
      schemasStore.findBySlug(route.params.slug)
    ])
    .spread((schemaEntries, schema) => {
      renderComponent(Admin, route, {
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
    .done();
});

cortex.route('admin/schemas', (route, next) => {
  var query = route.query || {};
  schemasStore
    .findAll(query)
    .then((schemas) => {
      renderComponent(Admin, route, {
        activePanelType: 'schemas',
        schemas,
        query
      });
    })
    .done();
});

cortex.route('admin/users', (route, next) => {
  var query = route.query || {};

  usersStore
    .findAll(query)
    .then((users) => {
      renderComponent(Admin, route, {
        activePanelType: 'users',
        users,
        query
      });
    })
    .done();
});

cortex.route('admin/users/:username', (route, next) => {
  Q()
    .then(() => usersStore.findOne({username: route.params.username}))
    .then((editUser) => {
      renderComponent(Admin, route, {
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
    .catch((error) => {

    });
});

cortex.route('admin/page/:slug', (route, next) => {
  Q()
    .then(() => pagesStore.findBySlug(route.params.slug))
    .then((page) => Q.all([page, elementsStore.findAll()]))
    .spread((page, elements) => Q.all([page, elements, colorsStore.findAll()]))
    .spread((page, elements, colors) => {

      var inTabs = false;
      forEach(route.data.tabs, (tab) => {
        if (tab.pageId._id === page._id) {
          inTabs = true;
          return false;
        }
      });

      if (!inTabs) {
        tabsStore.add({
          pageId: page._id,
          userId: route.data.user._id
        });
      }

      renderComponent(Admin, route, {
        activePanelType: 'pageBuild',
        elements,
        page,
        colors
      });
    })
    .catch((error) => {

    });
});

export default {
  routes: cortex.getRoutes()
};
