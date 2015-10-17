import createHistory from 'history/lib/createBrowserHistory';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {reduxReactRouter} from 'redux-router';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../../reducers';

const loggerMiddleware = createLogger();

// Be sure to ONLY add this middleware in development!
const middleware = typeof __DEVELOPMENT__ !== undefined ?
  [
    require('redux-immutable-state-invariant')(),
    thunkMiddleware,
    loggerMiddleware
  ] :
  [thunkMiddleware, loggerMiddleware];

export default function configureStore (initialState, routes = []) {
  console.log(routes);
  const store = compose(
    applyMiddleware(
      ...middleware
    ),
    reduxReactRouter({
      routes,
      createHistory
    })
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../reducers', () => {
      const nextReducer = require('../../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
