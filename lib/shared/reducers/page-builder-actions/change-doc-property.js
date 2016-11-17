import get from 'lodash/get';

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
  const splitted = property.split('#');

  // previous value
  const previousValue = get(doc, splitted);

  // processed value
  let processed = value;

  if (property === 'title') {
    // strip tags
    const div = document.createElement('div');
    div.innerHTML = value;
    processed = div.textContent || div.innerText || '';
  }

  // change in doc
  const newDoc = Object.assign({}, doc);

  let iterator = newDoc;
  splitted.forEach((key, index) => {
    if (index !== splitted.length - 1) {
      iterator[key] = Object.assign({}, iterator[key]);
      iterator = iterator[key];
    } else {
      iterator[key] = processed;
    }
  });

  return {
    doc: newDoc,
    revertAction: Object.assign({}, action, {
      value: previousValue
    })
  };
};
