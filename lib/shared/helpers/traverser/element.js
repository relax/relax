import Symbol from 'elements/symbol';
import elements from 'elements';
import getElementProps from 'helpers/get-element-props';

import calculateLinks from './links';

/**
 * Traverses a relax element childrens array
 *
 * @param   {Array} children - children ids array
 * @param   {Object} context - current context
 * @param   {Object} options
 * @returns {Object} element
 *  - ElementClass
 *  - props
 *  - context
 *  - children
 *  - display
 */
export default (options, settings) => {
  const {display} = settings;
  const {elementId, links, data, entry, position, isTemplate} = options;

  // return variables
  let editable = options.editable;
  let childrenContext = options.context;
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
      values: entry,
      isTemplate
    });

    // set from results
    element = result.element;
    props = result.elementProps;
    displayElement = result.display !== false;
    childrenContext = result.context || options.context;
    children = result.children;
    builderLink = result.builderLink;
    editable = !result.builderLink;
  }

  return {
    ElementClass,
    props,
    context: options.context,
    childrenContext,
    elementId,
    element,
    children,
    positionInParent: position,
    displayElement,
    editable: !!editable,
    elementLinks: elementLinks || [],
    builderLink,
    isTemplate
  };
};
