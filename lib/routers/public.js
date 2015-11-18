import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Page from '../containers/public/page';

export default [
  <Route path='/:slug' component={Page} />,
  <Route path='/' component={Page} />
];
