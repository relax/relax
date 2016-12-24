import serialize from 'serialize-javascript';
import Html from 'components/html';
import React from 'react';
import {renderToString} from 'react-dom/server';

export default ({component, store, locals}) => {
  const state = store.getState();
  const initialState = serialize(state);

  const markup = renderToString(component);

  const htmlMarkup = renderToString(
    <Html
      body={markup}
      props={initialState}
      locals={locals}
    />
  );

  return htmlMarkup;
};
