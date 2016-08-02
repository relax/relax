export default (selected, {id, context}) => (
  selected &&
  selected.id === id &&
  selected.context === context
);
