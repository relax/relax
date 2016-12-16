import getActiveContextFragment from './get-active-context-fragment';

export default ({state, id, context}) => {
  const fragment = getActiveContextFragment(state, context);
  const docProperty = fragment && fragment.doc[context.property];
  return docProperty && docProperty[id];
};
