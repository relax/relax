import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Scrollable from 'components/scrollable';
import bind from 'decorators/bind';
import traverser from 'helpers/traverser';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Empty from './empty';
import Entry from './entry';
import styles from './layers.less';

const bodyDropInfo = {
  id: 'Body',
  type: 'Body',
  context: 'data'
};
export default class Layers extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    expanded: PropTypes.object,
    userExpanded: PropTypes.object,
    overed: PropTypes.object,
    dragging: PropTypes.bool,
    type: PropTypes.string,
    pageBuilderActions: PropTypes.object.isRequired
  };

  componentDidMount () {
    const elem = document.getElementById('selected-element');
    const scroll = this.refs.scroll;

    if (elem) {
      const rect = elem.getBoundingClientRect();
      const scrollRect = findDOMNode(scroll).getBoundingClientRect();
      const relativeTop = rect.top - scrollRect.top;

      if (relativeTop > scrollRect.height / 2) {
        scroll.refs.gemini.refs['scroll-view'].scrollTop = relativeTop - scrollRect.height / 2;
      }
    }
  }

  render () {
    const {pageBuilderActions} = this.props;

    return (
      <Scrollable ref='scroll'>
        <div className={styles.filterDisplay}>
          <button
            className={styles.trigger}
            onClick={pageBuilderActions.expandAll}
          >
            Expand all
          </button>
          <button
            className={styles.trigger}
            onClick={pageBuilderActions.collapseAll}
          >
            Collapse all
          </button>
        </div>
        <div className={styles.structureList}>
          <ul className={styles.list}>
            {this.renderContent()}
          </ul>
        </div>
      </Scrollable>
    );
  }

  renderContent () {
    const {template, doc, type} = this.props;

    let content = traverser({
      template,
      doc,
      display: 'desktop',
      editing: true,
      type
    }, this.renderListEntry);

    if (!template) {
      content = (
        <Droppable
          key='Body'
          type='Body'
          placeholder
          dropInfo={bodyDropInfo}
          showMarks={false}
        >
          {content}
        </Droppable>
      );
    }

    return content;
  }

  @bind
  renderListEntry (elementInfo, children) {
    const {
      pageBuilderActions,
      expanded,
      userExpanded,
      dragging,
      selected,
      overed
    } = this.props;
    const {
      ElementClass,
      elementId,
      context,
      element,
      elementLinks,
      editable,
      isTemplate,
      positionInParent
    } = elementInfo;

    const hasChildren = !!(children && children.constructor === Array && children.length);

    // check expanded
    const wasExpanded = expanded[context] && expanded[context][elementId];
    const wasUserExpanded = userExpanded[context] && userExpanded[context][elementId];
    const isExpanded = !!(hasChildren && (wasExpanded || wasUserExpanded));

    // children
    let childrenContent;
    const dropSettings = Object.assign({}, ElementClass.settings.drop, {
      orientation: 'vertical',
      customDropArea: false,
      selectionChildren: false
    });
    const dropInfo = {
      id: element.id,
      context
    };

    if (isExpanded && hasChildren && editable) {
      childrenContent = (
        <ul className={styles.list}>
          <Droppable
            showMarks={false}
            type={element.tag}
            dropInfo={dropInfo}
            {...dropSettings}
            hitSpace={12}
          >
            {children}
          </Droppable>
        </ul>
      );
    } else if (editable && dragging && !hasChildren && ElementClass.settings.drop !== false) {
      childrenContent = (
        <ul className={styles.list}>
          <Droppable
            type={element.tag}
            dropInfo={dropInfo}
            showMarks={false}
            {...dropSettings}
            minHeight={12}
            placeholder
            placeholderRender={this.renderPlaceholder}
          />
        </ul>
      );
    } else if (hasChildren && isExpanded) {
      childrenContent = (
        <ul className={styles.list}>
          {children}
        </ul>
      );
    }

    return (
      <li key={element.id}>
        <Entry
          pageBuilderActions={pageBuilderActions}
          element={element}
          editable={editable}
          isTemplate={isTemplate}
          context={context}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          dragging={dragging}
          ElementClass={ElementClass}
          selected={selected}
          overed={overed}
          hasLinks={!!(elementLinks && elementLinks.length)}
          positionInParent={positionInParent}
        />
        {childrenContent}
      </li>
    );
  }

  @bind
  renderPlaceholder (options) {
    return (
      <Empty {...options} />
    );
  }
}
