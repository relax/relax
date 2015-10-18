export default [
  {
    path: 'admin',
    params: {
      activePanelType: 'settings',
      breadcrumbs: [
        {
          label: 'Settings'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/pages',
    params: {
      activePanelType: 'pages',
      breadcrumbs: [
        {
          label: 'Pages'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/pages/:slug',
    params: {
      activePanelType: 'page',
      breadcrumbs: [
        {
          label: 'Pages',
          type: 'pages',
          link: '/admin/pages'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/colors',
    params: {
      activePanelType: 'colors',
      breadcrumbs: [
        {
          label: 'Colors'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/menus',
    params: {
      activePanelType: 'menus',
      breadcrumbs: [
        {
          label: 'Menus'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/menus/:slug',
    params: {
      activePanelType: 'menu',
      breadcrumbs: [
        {
          label: 'Menus',
          type: 'menus',
          link: '/admin/menus'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/users',
    params: {
      activePanelType: 'users',
      breadcrumbs: [
        {
          label: 'Users'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  },
  {
    path: 'admin/users/:username',
    params: {
      activePanelType: 'userEdit',
      breadcrumbs: [
        {
          label: 'Users',
          type: 'users',
          link: '/admin/users'
        }
      ]
    },
    callback (render, req, next) {
      render(this.params);
    }
  }
];
