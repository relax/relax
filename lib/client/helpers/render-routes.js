import configureStore from 'helpers/configure-store';
import createHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

export default function renderRoutes (routes) {
  const state = window.__initialState;
  state.router = undefined;
  const store = configureStore(
    reduxReactRouter({createHistory, routes}),
    state
  );

  render(
    <Provider store={store}>
      <ReduxRouter routes={routes} />
    </Provider>,
    document.getElementById('view')
  );
}
