import React, {renderToString} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import serialize from 'serialize-javascript';

import HTML from '../../components/html';

export default function getMarkup (store, res) {
  const state = store.getState();
  const initialState = serialize(state);

  const markup = renderToString(
    <Provider store={store} key='provider'>
      {() => <ReduxRouter />}
    </Provider>
  );

  const htmlMarkup = renderToString(
    <HTML
      body={markup}
      props={initialState}
      locals={res.locals}
    />
  );

  return htmlMarkup;
}
