import invariant from 'invariant';

export default (state, context, changes) => {
  // context must befined
  invariant(context, 'Context not defined in page builder action');

  // context must have a "doc" property
  const docID = context.doc;
  invariant(context.doc, '"doc" not found in context in page builder action');

  // must exist
  const fragment = state.fragments[docID];
  invariant(fragment, 'Could not find data segment from context given in page builder action');

  return Object.assign({}, state, {
    fragment: Object.assign({}, state.fragment, {
      [docID]: Object.assign({}, fragment, changes)
    })
  });
};
