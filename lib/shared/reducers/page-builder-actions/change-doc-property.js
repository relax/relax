/**
 * Changes a property from the document (text)
 *
 * @param   doc {Object}
 * @param   action {Object}
 *  - elementId
 *  - value
 *  - context
 */
export default (doc, action) => {
  const {property, value} = action;

  // previous value
  const previousValue = doc[property];

  // processed value
  let processed = value;

  if (property === 'title') {
    // strip tags
    const div = document.createElement('div');
    div.innerHTML = value;
    processed = div.textContent || div.innerText || '';
  }

  return {
    doc: Object.assign({}, doc, {
      [property]: processed
    }),
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
