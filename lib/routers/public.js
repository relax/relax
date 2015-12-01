import React from 'react';
import {Route} from 'react-router';

import gaSend from '../client/helpers/ga-send';
import Page from '../containers/public/page';

export default [
  <Route path='/:slug' component={Page} onEnter={gaSend} />,
  <Route path='/' component={Page} onEnter={gaSend} />
];
