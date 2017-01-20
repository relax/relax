export default (selected, {id, context}) => !!(
  selected &&
  selected.id === id &&
  selected.context.doc === context.doc &&
  selected.context.property === context.property
);
