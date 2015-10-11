export default [
  {
    path: 'admin/pages',
    callback: (render, req, next) => {
      render({
        activePanelType: 'pages'
      });
    }
  },
  {
    path: 'admin/pages/:slug',
    callback: (render, req, next) => {
      render({
        activePanelType: 'page',
        slug: req.params.slug,
        breadcrumbs: []
      });
    }
  }
];
