import createHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import configureStore from '../../helpers/configure-store';

export default function renderRoutes (routes) {
  const state = window.__initialState;
  const store = configureStore(
    reduxReactRouter({routes, createHistory}),
    state
  );

  render(
    <Provider store={store}>
      <ReduxRouter children={routes} />
    </Provider>,
    document.getElementById('view')
  );
}
