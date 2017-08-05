import Droppable from 'components/dnd/droppable';
import Portal from 'components/portal';
import bind from 'decorators/bind';
import calculateAdminElement from 'helpers/element/calculate-admin';
import calculateElement from 'helpers/element/calculate';
import get from 'lodash/get';
import getElement from 'helpers/page-builder/get-element';
import getLinksValues from 'helpers/element/get-links-values';
import isElementSelected from 'helpers/page-builder/is-element-selected';
import shallowEqual from 'helpers/shallow-equal';
import stylesManager from 'helpers/styles-manager';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectAdvanced} from 'react-redux';

import Element from './element';
import ElementText from './element-text';
import Empty from './empty';

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
    editing: PropTypes.bool.isRequired,             // true if on edit mode
    building: PropTypes.bool.isRequired,            // true if on building mode
    editable: PropTypes.bool.isRequired,            // true if this element is editable
    links: PropTypes.object,                        // links map [elementID] -> links
    linksData: PropTypes.oneOfType([
      PropTypes.string,                             // doc identifier for current data object
      PropTypes.object                              // current data object
    ]),
    updateStylesMap: PropTypes.func.isRequired,     // updates the styles map,
    draggingSelf: PropTypes.bool,
    parentDragging: PropTypes.bool,
    processedElement: PropTypes.object.isRequired,
    styleMap: PropTypes.object.isRequired,
    adminElement: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    customProps: PropTypes.object,
    selected: PropTypes.bool.isRequired
  };

  render () {
    const {element, updateStylesMap} = this.props;
    let result = null;

    if (element) {
      const {
        processedElement,
        styleMap,
        adminElement,
        context,
        editable,
        editing,
        building,
        positionInParent,
        customProps,
        selected
      } = this.props;

      if (processedElement.displayElement) {
        const {ElementClass, props, hasLink, children} = processedElement;
        const {selectable} = adminElement;

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
              editable: editable && editing && building,
              selectable,
              positionInParent,
              hasLink,
              editing,
              building,
              selected
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
    const {customDropProps, noDrop} = options;
    const {element, processedElement, adminElement} = this.props;

    const {
      ElementClass,
      children,
      childrenParent,
      childrenContext
    } = processedElement;
    const {childrenEditable} = adminElement;

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

    let result;

    if (!noDrop && childrenEditable) {
      const droppableProps = Object.assign({
        dropInfo: {
          id: childrenParent,
          context: childrenContext
        },
        type: element.tag,
        placeholder: true,
        placeholderRender: this.renderPlaceholder
      }, ElementClass.settings.drop, customDropProps);

      result = (
        <Droppable {...droppableProps}>
          {options.children || children && children.map(this.renderChild, this)}
        </Droppable>
      );
    } else {
      result = options.children || children && children.map(this.renderChild, this);
    }

    return result;
  }

  renderChild (childId, position) {
    const {
      editing,
      building,
      updateStylesMap,
      draggingSelf,
      parentDragging,
      processedElement,
      adminElement
    } = this.props;
    const {childrenLinks, childrenLinksData, childrenContext, customChildrenProps} = processedElement;
    const {childrenEditable} = adminElement;

    return (
      <ConnectedPageElement
        key={childId}
        id={childId}
        contextDoc={childrenContext.doc}
        contextProperty={childrenContext.property}
        links={childrenLinks}
        linksData={childrenLinksData}
        customProps={customChildrenProps}
        editable={childrenEditable}
        updateStylesMap={updateStylesMap}
        positionInParent={position}
        editing={editing}
        building={building}
        parentDragging={draggingSelf || parentDragging}
      />
    );
  }

  @bind
  renderPlaceholder (options) {
    const {element, processedElement} = this.props;
    const {ElementClass} = processedElement;

    return (
      <Empty {...options} settings={ElementClass.settings} element={element} />
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
    editable,
    editing,
    building
  } = nextOwnProps;
  const {element, display} = nextUpdatable;

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
    styles: nextState.styles,
    display
  });

  // Calculate admin element info
  // checks if is editable, selectable and whatnot
  const adminElement = calculateAdminElement(processedElement, {
    editable,
    editing,
    building
  });

  // assign to props
  result.context = context;
  result.processedElement = processedElement;
  result.adminElement = adminElement;
  result.styleMap = styleMap;

  return result;
}

function calculateUpdatable (prevUpdatable, prevState, nextState, nextOwnProps) {
  let updatable = prevUpdatable;

  if (
    prevState.dnd !== nextState.dnd ||
    prevState.pageBuilder !== nextState.pageBuilder ||
    prevState.display !== nextState.display
  ) {
    const {id, contextDoc, contextProperty, links, linksData} = nextOwnProps;

    updatable = {
      display: nextState.display
    };

    // element
    updatable.element = getElement({
      state: nextState.pageBuilder,
      id,
      context: {
        doc: contextDoc,
        property: contextProperty
      }
    });

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

    // dragging self (to prevent drag into self)
    const dragInfo = nextState.dnd.dragInfo;
    if (dragInfo && dragInfo.context) {
      updatable.draggingSelf =
        dragInfo.id === id &&
        dragInfo.context.doc === contextDoc &&
        dragInfo.context.property === contextProperty;
    } else {
      updatable.draggingSelf = false;
    }

    // selected
    updatable.selected = isElementSelected(
      nextState.pageBuilder.selected,
      {
        id,
        context: {
          doc: contextDoc,
          property: contextProperty
        }
      }
    );
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
