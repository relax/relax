import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import bind from 'decorators/bind';
import calculateAdminElement from 'helpers/element/calculate-admin';
import calculateElement from 'helpers/element/calculate';
import get from 'lodash/get';
import getElement from 'helpers/page-builder/get-element';
import getLinksValues from 'helpers/element/get-links-values';
import isElementSelected from 'helpers/page-builder/is-element-selected';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Empty from './empty';
import Entry from './entry';
import styles from './index.less';

class PageElement extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,                // element id
    contextDoc: PropTypes.string.isRequired,        // element doc context
    contextProperty: PropTypes.string.isRequired,   // element property context
    element: PropTypes.object.isRequired,           // element object
    positionInParent: PropTypes.number.isRequired,  // index position in parent
    display: PropTypes.string.isRequired,           // current display
    editable: PropTypes.bool.isRequired,            // true if this element is editable
    links: PropTypes.object,                        // links map [elementID] -> links
    linksData: PropTypes.oneOfType([
      PropTypes.string,                             // doc identifier for current data object
      PropTypes.object                              // current data object
    ]),
    pageBuilderActions: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isOvered: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    dragging: PropTypes.bool
  };

  render () {
    const {element} = this.props;
    let result;

    if (element) {
      const {
        display,
        contextDoc,
        contextProperty,
        links,
        linksData,
        editable,
        positionInParent,
        pageBuilderActions,
        isSelected,
        isOvered,
        isExpanded,
        dragging
      } = this.props;

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
        linksData,
        values: this.props,
        valuesPrefix: 'prop-'
      });

      // Calculate admin element info
      // checks if is editable, selectable and whatnot
      this.adminElement = calculateAdminElement(this.processedElement, {
        editable,
        editing: true,
        building: true
      });

      const {children, hasLink} = this.processedElement;
      const hasChildren = !!(children && children.constructor === Array && children.length);

      result = (
        <li key={element.id}>
          <Entry
            context={context}
            element={element}
            ElementClass={this.processedElement.ElementClass}
            isSelectable={this.adminElement.selectable}
            pageBuilderActions={pageBuilderActions}
            isSelected={isSelected}
            isOvered={isOvered}
            positionInParent={positionInParent}
            hasLinks={hasLink}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            dragging={dragging}
          />
          {this.renderChildren()}
        </li>
      );
    }

    return result;
  }

  renderChildren () {
    const {
      ElementClass,
      children,
      childrenParent,
      childrenContext
    } = this.processedElement;
    const {childrenEditable} = this.adminElement;
    const {element, isExpanded, dragging} = this.props;
    const hasChildren = !!(children && children.constructor === Array && children.length);
    const canDrop = ElementClass.settings.drop !== false;

    let result;

    const droppableProps = Object.assign({
      dropInfo: {
        id: childrenParent,
        context: childrenContext
      },
      showMarks: false,
      type: element.tag
    }, ElementClass.settings.drop, {
      orientation: 'vertical',
      customDropArea: false,
      selectionChildren: false,
      hidePlaceholder: true
    });

    if (childrenEditable && canDrop && isExpanded && hasChildren) {
      result = (
        <ul className={styles.list}>
          <Droppable
            {...droppableProps}
            hitSpace={12}
          >
            {children && children.map(this.renderChild, this)}
          </Droppable>
        </ul>
      );
    } else if (childrenEditable && canDrop && dragging && !hasChildren) {
      result = (
        <ul className={styles.list}>
          <Droppable
            {...droppableProps}
            minHeight={12}
            placeholder
            placeholderRender={this.renderPlaceholder}
          />
        </ul>
      );
    } else if (hasChildren && isExpanded) {
      result = (
        <ul className={styles.list}>
          {children && children.map(this.renderChild, this)}
        </ul>
      );
    }

    return result;
  }

  renderChild (childId, position) {
    const {pageBuilderActions} = this.props;
    const {childrenContext, childrenLinks, childrenLinksData} = this.processedElement;
    const {childrenEditable} = this.adminElement;

    return (
      <ConnectedElement
        key={childId}
        id={childId}
        contextDoc={childrenContext.doc}
        contextProperty={childrenContext.property}
        links={childrenLinks}
        linksData={childrenLinksData}
        editable={childrenEditable}
        positionInParent={position}
        pageBuilderActions={pageBuilderActions}
      />
    );
  }

  @bind
  renderPlaceholder (options) {
    return (
      <Empty {...options} />
    );
  }
}

// Redux map state to props
const mapStateToProps = (state, props) => {
  const {id, contextDoc, contextProperty, links, linksData} = props;

  const result = {
    display: state.display,
    dragging: state.dnd.dragging
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
    Object.assign(result, getLinksValues({
      fragments: state.pageBuilder.fragments,
      elementLinks,
      linksData,
      prefix: 'prop-'
    }));
  }

  // selected
  result.isSelected = isElementSelected(state.pageBuilder.selected, {
    id,
    context: {
      doc: contextDoc,
      property: contextProperty
    }
  });

  // overed
  result.isOvered = isElementSelected(state.pageBuilder.overed, {
    id,
    context: {
      doc: contextDoc,
      property: contextProperty
    }
  });

  // check expanded
  const {expanded, userExpanded} = state.pageBuilder;
  const wasExpanded = get(expanded, [contextDoc, contextProperty, id], false);
  const wasUserExpanded = get(userExpanded, [contextDoc, contextProperty, id], false);

  result.isExpanded = !!(wasExpanded || wasUserExpanded);

  return result;
};

// Connected element
const ConnectedElement = connect(mapStateToProps)(PageElement);

export default ConnectedElement;
