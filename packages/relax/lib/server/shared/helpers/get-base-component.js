import React from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

export default (store) => (
  <Provider store={store}>
    <ReduxRouter />
  </Provider>
);
