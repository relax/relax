import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers';

const middleware = [];

if (typeof __DEVELOPMENT__ !== 'undefined') {
  middleware.push(require('redux-immutable-state-invariant')());
}

middleware.push(thunkMiddleware);

if (typeof window !== 'undefined') {
  middleware.push(createLogger());
}

export default function configureStore (routerMiddleware, initialState) {
  const store = compose(
    applyMiddleware(
      ...middleware
    ),
    routerMiddleware
  )(createStore)(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
