import invariant from 'invariant';

export default (state) => {
  const numSymbols = state.symbolsEditing.length;
  let fragment;

  if (numSymbols) {
    fragment = state.fragments[state.symbolsEditing[numSymbols - 1]];
  } else {
    fragment = state.fragments.draft;
  }

  invariant(fragment, 'Could not find data segment from context given in page builder action');

  return fragment;
};
