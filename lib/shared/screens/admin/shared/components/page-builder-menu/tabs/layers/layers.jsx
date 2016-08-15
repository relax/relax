import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './layers.less';
import Entry from './entry';

export default class Layers extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    elements: PropTypes.object,
    expanded: PropTypes.object,
    userExpanded: PropTypes.object,
    overed: PropTypes.object,
    dragging: PropTypes.bool,
    type: PropTypes.string,
    pageBuilderActions: PropTypes.object.isRequired
  };

  render () {
    const {pageBuilderActions} = this.props;

    return (
      <Scrollable>
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
          {this.renderContent()}
        </div>
      </Scrollable>
    );
  }

  renderContent () {
    const {template, doc, type} = this.props;

    const data = template ? template.data : doc.data;

    return data.body && data.body.children && this.renderList(
      data.body.children,
      {
        dropInfo: {id: 'body', context: 'data'},
        dropSettings: {},
        droppable: !template,
        data,
        context: template ? template._id : 'data',
        links: template && template.links && template.links[type]
      }
    );
  }

  renderList (children, options) {
    let result;

    if (!options.droppable) {
      result = (
        <ul className={styles.list}>
          {children.map(this.renderListEntry.bind(this, options))}
        </ul>
      );
    } else {
      result = (
        <ul className={styles.list}>
          <Droppable
            showMarks={false}
            type={parent.type}
            dropInfo={options.dropInfo}
            {...options.dropSettings}
            hitSpace={12}
          >
            {children.map(this.renderListEntry.bind(this, options))}
          </Droppable>
        </ul>
      );
    }

    return result;
  }

  renderListEntry (options, elementId) {
    const {
      elements,
      expanded,
      userExpanded,
      dragging,
      pageBuilderActions,
      selected,
      overed
    } = this.props;
    const {data, context, links} = options;

    const element = data[elementId];
    const hasChildren = element.children instanceof Array && element.children.length > 0;
    const ElementClass = elements[element.tag];

    const dropInfo = {
      id: element.id,
      context
    };
    let dropSettings = ElementClass.settings.drop;

    const wasExpanded = expanded[context] && expanded[context][elementId];
    const wasUserExpanded = userExpanded[context] && userExpanded[context][elementId];
    const isExpanded = !!(hasChildren && (wasExpanded || wasUserExpanded));
    const hasLinks = !!(links && links[element.id]);

    if (dropSettings !== false) {
      dropSettings = Object.assign({}, dropSettings, {
        orientation: 'vertical',
        customDropArea: false,
        selectionChildren: false
      });
    }

    let underlings;

    if (isExpanded) {
      underlings = this.renderList(
        element.children,
        Object.assign({}, options, {
          dropInfo,
          dropSettings
        })
      );
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
          context={context}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          dragging={dragging}
          ElementClass={ElementClass}
          selected={selected}
          overed={overed}
          hasLinks={hasLinks}
        />
        {underlings}
      </li>
    );
  }
}
