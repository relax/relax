import merge from 'lodash.merge';

export default [

  {
    path: 'admin/pages',
    callback: (render, req, next) => {
      render({
        activePanelType: 'pages'
      });
    }
  }

];
