import Droppable from 'components/dnd/droppable';
import Portal from 'components/portal';
import bind from 'decorators/bind';
import calculateAdminElement from 'helpers/element/calculate-admin';
import calculateElement from 'helpers/element/calculate';
import get from 'lodash/get';
import getElement from 'helpers/page-builder/get-element';
import stylesManager from 'helpers/styles-manager';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
    updateStylesMap: PropTypes.func.isRequired      // updates the styles map
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render () {
    const {element, updateStylesMap} = this.props;
    let result;

    if (element) {
      const {
        display,
        links,
        contextDoc,
        contextProperty,
        linksData,
        editable,
        editing,
        building,
        positionInParent
      } = this.props;
      const {store} = this.context;

      // Context object
      const context = {
        doc: contextDoc,
        property: contextProperty
      };

      // Process element
      this.processedElement = calculateElement({
        element,
        context,
        display,
        links,
        linksData
      });

      // Generate element style
      const styleMap = stylesManager.processElement({
        element,
        context,
        styles: store.getState().styles,
        display
      });

      // Calculate admin element info
      // checks if is editable, selectable and whatnot
      this.adminElement = calculateAdminElement(this.processedElement, {
        editable,
        editing,
        building
      });

      if (this.processedElement.displayElement) {
        const {ElementClass, props} = this.processedElement;
        const {selectable} = this.adminElement;

        // render element
        result = (
          <ElementClass
            {...props}
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
              positionInParent
            }}
          />
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
    const {customDropProps} = options;
    const {element} = this.props;

    const {
      ElementClass,
      children,
      childrenParent,
      childrenContext
    } = this.processedElement;
    const {childrenEditable} = this.adminElement;

    let result;

    if (childrenEditable) {
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
          {children && children.map(this.renderChild, this)}
        </Droppable>
      );
    } else {
      result = children && children.map(this.renderChild, this);
    }

    return result;
  }

  renderChild (childId, position) {
    const {editing, building, links, linksData, updateStylesMap} = this.props; // XXX this needs change (links, linksData)
    const {childrenContext} = this.processedElement;
    const {childrenEditable} = this.adminElement;

    return (
      <ConnectedPageElement
        key={childId}
        id={childId}
        contextDoc={childrenContext.doc}
        contextProperty={childrenContext.property}
        links={links}
        linksData={linksData}
        editable={childrenEditable}
        updateStylesMap={updateStylesMap}
        positionInParent={position}
        editing={editing}
        building={building}
      />
    );
  }

  @bind
  renderPlaceholder (options) {
    const {element} = this.props;
    const {ElementClass} = this.processedElement;

    return (
      <Empty {...options} settings={ElementClass.settings} element={element} />
    );
  }
}

// Redux map state to props
const mapStateToProps = (state, props) => {
  const {id, contextDoc, contextProperty, links} = props;

  const result = {
    display: state.display
  };

  // element
  result.element = getElement({
    state: state.pageBuilder,
    id,
    context: {
      doc: contextDoc,
      property: contextProperty
    }
  });

  // linked properties
  const elementLinks = links && links[id];
  if (elementLinks) {
    // need to "listen" for attributes

  }

  return result;
};

// Connected element
const ConnectedPageElement = connect(mapStateToProps)(PageElement);

export default ConnectedPageElement;
