import React from 'react';
import {Route} from 'react-router';

import Page from '../containers/public/page';

export default [
  <Route path='/:slug' component={Page} />
];
