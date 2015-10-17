import React, {render} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import configureStore from './helpers/configure-store';
import routes from './routers/auth';

const store = configureStore({}, routes);

render(
  <Provider store={store}>
    {() => <ReduxRouter children={routes} />}
  </Provider>,
  document.getElementById('view')
);
