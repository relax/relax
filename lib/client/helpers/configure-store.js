import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
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

export default function configureStore (initialState) {
  const store = applyMiddleware(
    ...middleware
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
