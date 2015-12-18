import combineActionsMiddleware from 'redux-combine-actions';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

import reducer from '../reducers';

const middleware = [];

middleware.push(combineActionsMiddleware);
middleware.push(thunkMiddleware);

if (typeof window !== 'undefined' && module.hot) {
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
