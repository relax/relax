import serialize from 'serialize-javascript';
import Html from 'components/html';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

export default function getMarkup (store, res) {
  const state = store.getState();
  const initialState = serialize(state);

  const markup = renderToString(
    <Provider store={store}>
      <ReduxRouter />
    </Provider>
  );

  const htmlMarkup = renderToString(
    <Html
      body={markup}
      props={initialState}
      locals={res.locals}
    />
  );

  return htmlMarkup;
}
