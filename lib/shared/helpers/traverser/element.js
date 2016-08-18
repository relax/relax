import getElementProps from 'helpers/get-element-props';
import Symbol from 'elements/symbol';

import calculateLinks from './links';

/**
 * Traverses a relax element childrens array
 *
 * @param   {Array} children - children ids array
 * @param   {String} context - current context
 * @param   {Object} options
 * @returns {Object} element
 *  - ElementClass
 *  - props
 *  - context
 *  - children
 *  - display
 */
export default (options, settings) => {
  const {elements, display} = settings;
  const {elementId, links, data, entry, position, editable} = options;

  // return variables
  let context = options.context;
  let element = data[elementId];

  const isSymbol = element.tag === 'Symbol';
  const ElementClass = isSymbol ? Symbol : elements[element.tag];

  let props = getElementProps(element, display);
  let displayElement = !element.hide || !element.hide[display];
  let children = !isSymbol && element.children;
  let builderLink;

  // links
  const elementLinks = links && links[elementId];
  if (elementLinks) {
    const result = calculateLinks({
      element,
      elementLinks,
      elementProps: props,
      values: entry
    });

    // set from results
    element = result.element;
    props = result.elementProps;
    displayElement = result.display !== false;
    context = result.context || context;
    children = result.children;
    builderLink = result.builderLink;
  }

  return {
    ElementClass,
    props,
    context,
    elementId,
    element,
    children,
    positionInParent: position,
    displayElement,
    editable,
    elementLinks,
    builderLink
  };
};
