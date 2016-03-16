import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './layers.less';
import Entry from './entry';

export default class Layers extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    expanded: PropTypes.object.isRequired,
    userExpanded: PropTypes.object.isRequired,
    dragging: PropTypes.bool.isRequired,
    selectedId: PropTypes.string,
    overedId: PropTypes.string
  };

  render () {
    const {data, pageBuilderActions} = this.props;
    return (
      <Scrollable>
        <div className={styles.filterDisplay}>
          <button className={styles.trigger} onClick={pageBuilderActions.expandAll}>Expand all</button>
          <button className={styles.trigger} onClick={pageBuilderActions.collapseAll}>Collapse all</button>
        </div>
        <div className={styles.structureList}>
          {
            data.body &&
            data.body.children &&
            this.renderList(
              data.body.children,
              {type: 'body', id: 'body'},
              {accepts: 'Section'},
              {tag: 'body'}
            )
          }
        </div>
      </Scrollable>
    );
  }

  renderList (children, dropInfo, dropSettings, parent, droppable = true) {
    let result;
    if (!droppable) {
      result = (
        <ul className={styles.list}>
          {children.map(this.renderListEntry, this)}
        </ul>
      );
    } else {
      result = (
        <ul className={styles.list}>
          <Droppable showMarks={false} type={parent.type} dropInfo={dropInfo} {...dropSettings} hitSpace={12}>
            {children.map(this.renderListEntry, this)}
          </Droppable>
        </ul>
      );
    }
    return result;
  }

  renderListEntry (elementId) {
    const {
      elements,
      data,
      expanded,
      userExpanded,
      dragging,
      pageBuilderActions,
      selectedId,
      overedId
    } = this.props;
    const element = data[elementId];
    const hasChildren = element.children instanceof Array && element.children.length > 0;
    const ElementClass = elements[element.tag];
    const dropInfo = {id: element.id};
    let dropSettings = ElementClass.settings.drop;
    const isExpanded = hasChildren && (expanded[elementId] || userExpanded[elementId]) && true;

    if (dropSettings !== false) {
      dropSettings = Object.assign({}, ElementClass.settings.drop, {
        orientation: 'vertical',
        customDropArea: false,
        selectionChildren: false
      });
    }

    let underlings;

    if (isExpanded) {
      underlings = this.renderList(element.children, dropInfo, dropSettings, element, dropSettings);
    } else if (dragging && !hasChildren && dropSettings !== false) {
      underlings = (
        <ul className={styles.list}>
          <Droppable
            type={element.tag}
            dropInfo={dropInfo}
            showMarks={false}
            {...dropSettings}
            minHeight={7}
          />
        </ul>
      );
    }

    return (
      <li key={element.id}>
        <Entry
          pageBuilderActions={pageBuilderActions}
          element={element}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          dragging={dragging}
          ElementClass={ElementClass}
          selectedId={selectedId}
          overedId={overedId}
        />
        {underlings}
      </li>
    );
  }
}
