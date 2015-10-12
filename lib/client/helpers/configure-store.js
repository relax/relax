import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../reducers';

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Be sure to ONLY add this middleware in development!
const middleware = typeof __DEVELOPMENT__ !== undefined ?
  [
    require('redux-immutable-state-invariant')(),
    thunkMiddleware,
    crashReporter
  ] :
  [thunkMiddleware, crashReporter];

const devTools = typeof __DEVTOOLS__ !== undefined ?
  [
    require('redux-devtools').devTools(), require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ] : [];

export default function configureStore (initialState) {
  const store = compose(
    applyMiddleware(
      ...middleware
    ),
    ...devTools
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
