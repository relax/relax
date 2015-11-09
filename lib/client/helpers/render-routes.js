import createHistory from 'history/lib/createBrowserHistory';
import React, {render} from 'react';
import {Provider} from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import {ReduxRouter} from 'redux-router';

import configureStore from '../../helpers/configure-store';

export default function renderRoutes (routes) {
  const state = window.__initialState;
  const store = configureStore(
    reduxReactRouter({routes, createHistory}),
    state
  );

  render(
    <Provider store={store}>
      {() => <ReduxRouter children={routes} />}
    </Provider>,
    document.getElementById('view')
  );
}
