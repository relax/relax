import merge from 'lodash.merge';

export default [
  {
    path: 'admin/pages',
    callback: (render, req, next) => {
      const query = merge({
        sort: '_id',
        order: 'desc',
        page: 1,
        limit: 10
      }, req.query);

      query.limit = parseInt(query.limit, 10);
      query.page = parseInt(query.page, 10);

      render({
        activePanelType: 'pages',
        query,
        breadcrumbs: [
          {
            label: 'Pages'
          }
        ]
      });
    }
  },
  {
    path: 'admin/pages/:slug',
    callback: (render, req, next) => {
      render({
        activePanelType: 'page',
        slug: req.params.slug,
        breadcrumbs: [
          {
            label: 'Pages',
            type: 'pages',
            link: '/admin/pages'
          }
        ]
      });
    }
  },
  {
    path: 'admin/colors',
    callback: (render, req, next) => {
      render({
        activePanelType: 'colors',
        breadcrumbs: [
          {
            label: 'Colors'
          }
        ]
      });
    }
  },
  {
    path: 'admin/menus',
    callback: (render, req, next) => {
      const query = merge({
        sort: '_id',
        order: 'desc',
        page: 1,
        limit: 10
      }, req.query);

      query.limit = parseInt(query.limit, 10);
      query.page = parseInt(query.page, 10);

      render({
        activePanelType: 'menus',
        query,
        breadcrumbs: [
          {
            label: 'Menus'
          }
        ]
      });
    }
  },
  {
    path: 'admin/menus/:slug',
    callback: (render, req, next) => {
      render({
        activePanelType: 'menu',
        slug: req.params.slug,
        breadcrumbs: [
          {
            label: 'Menus',
            type: 'menus',
            link: '/admin/menus'
          }
        ]
      });
    }
  }
];
