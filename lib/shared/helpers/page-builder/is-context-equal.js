export default (context1, context2) => (
  context1.doc === context2.doc &&
  context1.property === context2.property
);
