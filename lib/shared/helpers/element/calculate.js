import elements from 'elements';

import calculateLinks from './calculate-links';
import getProps from './get-props';

export default ({element, context, display, links, linksData, hideEmpty}) => {
  const isSymbol = element.tag === 'Symbol';
  const ElementClass = elements[element.tag];

  // output
  let props = getProps(element, display);
  let displayElement = true;

  // children info
  let children = !isSymbol && element.children;
  let childrenParent = element.id;
  let childrenContext = context;

  // links info
  let hasDataLink = false;
  let hasPropLink = false;

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
    children = result.children;
    childrenParent = result.builderLink ? 'Body' : childrenParent;
    childrenContext = result.context;

    hasDataLink = !!result.builderLink;
    hasPropLink = !result.builderLink; // TODO improve
  }

  return {
    ElementClass,
    props,
    displayElement,
    children,
    childrenParent,
    childrenContext,
    hasDataLink,
    hasPropLink
  };
};
