import Portal from 'components/portal';
import bind from 'decorators/bind';
import calculateElement from 'helpers/element/calculate';
import get from 'lodash/get';
import getLinksValues from 'helpers/element/get-links-values';
import shallowEqual from 'helpers/shallow-equal';
import stylesManager from 'helpers/styles-manager';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectAdvanced} from 'react-redux';

import Element from './element';
import ElementText from './element-text';

const defaultStyleClassMap = {};
const defaultStyleValues = {};

class PageElement extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,                // element id
    contextDoc: PropTypes.string.isRequired,        // element doc context
    contextProperty: PropTypes.string.isRequired,   // element property context
    element: PropTypes.object.isRequired,           // element object
    positionInParent: PropTypes.number.isRequired,  // index position in parent
    display: PropTypes.string.isRequired,           // current display
    links: PropTypes.object,                        // links map [elementID] -> links
    linksData: PropTypes.oneOfType([
      PropTypes.string,                             // doc identifier for current data object
      PropTypes.object                              // current data object
    ]),
    updateStylesMap: PropTypes.func.isRequired,     // updates the styles map,
    processedElement: PropTypes.object.isRequired,
    styleMap: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    customProps: PropTypes.object,
    fragments: PropTypes.object.isRequired
  };

  render () {
    const {element, updateStylesMap} = this.props;
    let result = null;

    if (element) {
      const {
        processedElement,
        styleMap,
        context,
        positionInParent,
        customProps
      } = this.props;

      if (processedElement.displayElement) {
        const {ElementClass, props, hasLink, children} = processedElement;

        // render element
        result = (
          <ElementClass
            {...props}
            {...customProps}
            styleClassMap={styleMap && styleMap.classMap || defaultStyleClassMap}
            Element={Element}
            ElementText={ElementText}
            renderChildren={this.renderChildren}
            relax={{
              element,
              context,
              styleValues: styleMap && styleMap.resultValues || defaultStyleValues,
              positionInParent,
              hasLink
            }}
          >
            {children}
          </ElementClass>
        );

        // render fixed elements out of the context
        const isFixed = get(styleMap, 'resultValues.position.position', 'static') === 'fixed';
        if (isFixed) {
          result = (
            <Portal attachTo='pb-canvas'>
              {result}
            </Portal>
          );
        }
      }
    }

    // update styles map after children
    updateStylesMap();

    return result;
  }

  @bind
  renderChildren (options = {}) {
    const {processedElement} = this.props;
    const {children} = processedElement;

    // options overlaps
    if (options.links) {
      processedElement.childrenLinks = options.links;
    }
    if (options.linksData) {
      processedElement.childrenLinksData = options.linksData;
    }
    if (options.customChildrenProps) {
      processedElement.customChildrenProps = options.customChildrenProps;
    }

    return options.children || children && children.map(this.renderChild, this);
  }

  renderChild (childId, position) {
    const {
      updateStylesMap,
      processedElement,
      fragments,
      display
    } = this.props;
    const {childrenLinks, childrenLinksData, childrenContext, customChildrenProps} = processedElement;

    return (
      <ConnectedPageElement
        key={childId}
        id={childId}
        contextDoc={childrenContext.doc}
        contextProperty={childrenContext.property}
        links={childrenLinks}
        linksData={childrenLinksData}
        customProps={customChildrenProps}
        updateStylesMap={updateStylesMap}
        positionInParent={position}
        fragments={fragments}
        display={display}
      />
    );
  }
}

// Calculate info
function calculateInfo (nextUpdatable, nextState, nextOwnProps) {
  const result = {};

  const {
    contextDoc,
    contextProperty,
    links,
    linksData,
    display
  } = nextOwnProps;
  const {element} = nextUpdatable;

  // Context object
  const context = {
    doc: contextDoc,
    property: contextProperty
  };

  // Process element
  const processedElement = calculateElement({
    element,
    context,
    display,
    links,
    linksData,
    values: nextOwnProps,
    valuesPrefix: 'prop-'
  });

  // Generate element style
  const styleMap = stylesManager.processElement({
    element,
    context,
    styles: nextOwnProps.styles,
    display,
    single: true
  });

  // assign to props
  result.context = context;
  result.processedElement = processedElement;
  result.styleMap = styleMap;

  return result;
}

function calculateUpdatable (prevUpdatable, prevState, nextState, nextOwnProps) {
  const {id, contextDoc, contextProperty, links, linksData} = nextOwnProps;
  const updatable = {};

  // element
  const fragments = nextOwnProps.fragments;
  updatable.element = get(fragments, [contextDoc, contextProperty, id]);

  // linked properties
  const elementLinks = links && links[id];
  if (elementLinks) {
    Object.assign(updatable, getLinksValues({
      fragments: nextState.pageBuilder.fragments,
      elementLinks,
      linksData,
      prefix: 'prop-'
    }));
  }

  return updatable;
}

function selectorFactory () {
  let result = {};
  let ownProps = {};
  let state = {};
  let updatable = {};
  let info = {};

  return (nextState, nextOwnProps) => {
    let needsUpdate = !shallowEqual(ownProps, nextOwnProps);

    if (state !== nextState || needsUpdate) {
      // calculates element info that should
      // trigger an update when changed
      const nextUpdatable = calculateUpdatable(
        updatable,
        state,
        nextState,
        nextOwnProps
      );

      if (needsUpdate || !shallowEqual(updatable, nextUpdatable)) {
        // updatable is different
        // calculate other info for this element
        info = calculateInfo(
          nextUpdatable,
          nextState,
          nextOwnProps
        );

        updatable = nextUpdatable;
        needsUpdate = true;
      }
    }

    ownProps = nextOwnProps;
    state = nextState;

    // change result if needed
    if (needsUpdate) {
      result = Object.assign({}, ownProps, updatable, info);
    }

    return result;
  };
}

// Connected element
const ConnectedPageElement = connectAdvanced(selectorFactory)(PageElement);

export default ConnectedPageElement;
