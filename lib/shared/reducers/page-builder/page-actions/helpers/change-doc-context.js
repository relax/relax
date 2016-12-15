export default (doc, context, changes) => Object.assign({}, doc, {
  [context]: Object.assign({}, doc[context], changes)
});
