import merge from 'lodash.merge';

export default [

  {
    path: 'admin/pages',
    callback: (render, req, next) => {
      let query = merge({
        sort: '_id',
        order: 'desc',
        page: 1,
        limit: 10
      }, req.query);

      query.limit = parseInt(query.limit, 10);
      query.page = parseInt(query.page, 10);

      render({
        activePanelType: 'pages',
        query: query
      });
    }
  }

];
