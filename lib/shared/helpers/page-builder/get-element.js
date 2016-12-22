import getContextFragment from './get-context-fragment';

export default ({state, id, context}) => {
  const fragment = getContextFragment(state, context);
  const docProperty = fragment && fragment.doc[context.property];
  return docProperty && docProperty[id];
};
