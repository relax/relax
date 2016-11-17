import React from 'react';
import configureStore from 'helpers/configure-store';
import createHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import {ReduxRouter, reduxReactRouter} from 'redux-router';
import {render} from 'react-dom';

export default function renderRoutes (routes, reducers) {
  const state = window.__initialState;
  const store = configureStore(
    reduxReactRouter({createHistory, routes}),
    reducers,
    state
  );

  render(
    <Provider store={store}>
      <ReduxRouter routes={routes} />
    </Provider>,
    document.getElementById('view')
  );
}
