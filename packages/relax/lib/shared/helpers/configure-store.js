import combineActionsMiddleware from 'redux-combine-actions';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';

const middleware = [];

middleware.push(combineActionsMiddleware);
middleware.push(thunkMiddleware);

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middleware.push(logger);
}

export default function configureStore (routerMiddleware, reducers, initialState) {
  const store = compose(
    applyMiddleware(
      ...middleware
    ),
    routerMiddleware
  )(createStore)(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
