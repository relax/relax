import elements from 'elements';

import calculateLinks from './calculate-links';
import getProps from './get-props';

export default ({element, context, display, editable, links, linksData, hideEmpty}) => {
  const isSymbol = element.tag === 'Symbol';
  const ElementClass = elements[element.tag];

  // output
  let props = getProps(element, display);
  let children = !isSymbol && element.children;
  let displayElement = true;
  let childrenContext = context;
  let childrenDisabled = editable;

  // check links to this element
  const elementLinks = links && links[element.id];
  if (elementLinks) {
    const result = calculateLinks({
      element,
      elementLinks,
      elementProps: props,
      values: linksData,
      hideEmpty
    });

    // set from results
    props = result.elementProps;
    displayElement = result.display !== false;
    childrenContext = result.context;
    children = result.children;
    childrenDisabled = !result.builderLink;
  }

  return {
    ElementClass,
    props,
    children,
    childrenContext,
    childrenDisabled,
    displayElement
  };
};
