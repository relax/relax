import combineActionsMiddleware from 'redux-combine-actions';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';

const IS_DEV_MODE = process.env.NODE_ENV === 'development';
const WINDOW_EXISTS = typeof window !== 'undefined';

const middleware = [];

const composeEnhancers =
  IS_DEV_MODE && WINDOW_EXISTS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

middleware.push(combineActionsMiddleware);
middleware.push(thunkMiddleware);

if (IS_DEV_MODE && WINDOW_EXISTS) {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middleware.push(logger);
}

export default function configureStore (routerMiddleware, reducers, initialState) {
  const store = composeEnhancers(
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
