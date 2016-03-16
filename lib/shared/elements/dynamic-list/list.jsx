import cx from 'classnames';
import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import classes from './classes';
import settings from './settings';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    entries: PropTypes.array.isRequired,
    limit: PropTypes.number,
    columns: PropTypes.number,
    renderChildren: PropTypes.func.isRequired,
    verticalGutter: PropTypes.number.isRequired,
    horizontalGutter: PropTypes.number.isRequired,
    elementsLinks: PropTypes.object.isRequired,
    linkingData: PropTypes.bool.isRequired,
    linkingDataElementId: PropTypes.string.isRequired,
    relax: PropTypes.object.isRequired
  };

  isLinkingData () {
    const {relax, linkingData, linkingDataElementId} = this.props;
    return linkingData && linkingDataElementId === relax.element.id;
  }

  render () {
    const items = [];
    let number = Math.min(this.props.entries.length, this.props.limit);
    if (number === 0) {
      number = this.props.limit;
    }

    for (let i = 0; i < number; i) {
      if (this.props.columns > 1) {
        const columnItems = [];
        for (let a = 0; a < this.props.columns && i < number; a++) {
          columnItems.push(this.renderItem(i, a === 0, a === this.props.columns - 1));
          i++;
        }
        if (columnItems.length < this.props.columns) {
          const missing = this.props.columns - columnItems.length;
          for (let c = 0; c < missing; c++) {
            columnItems.push(this.renderItem(i, false, c === missing - 1, true));
          }
        }
        items.push(this.renderRow(columnItems, i >= number));
      } else {
        items.push(this.renderItem(i));
        i++;
      }
    }
    return (
      <div>
        {items}
      </div>
    );
  }

  renderRow (items, isLast) {
    const style = {};
    if (!isLast) {
      if (this.isLinkingData()) {
        style.borderBottom = `${this.props.verticalGutter} solid rgba(0, 0, 0, 0.8)`;
      } else {
        style.marginBottom = this.props.verticalGutter;
      }
    }

    return (
      <div className={cx(classes.row)} style={style}>
        {items}
      </div>
    );
  }

  renderItem (key, isFirst, isLast, dummy = false) {
    let result;
    const {relax, entries, elementsLinks, children, horizontalGutter, columns} = this.props;
    const editing = relax.editing;
    const schemaEntry = entries && entries[key];
    const content = children && relax.renderChildren(relax.element.children, {
      elementsLinks,
      schemaEntry
    });
    const spaceThird = Math.round(parseInt(horizontalGutter, 10) / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    if (!dummy) {
      if (editing) {
        result = (
          <Droppable
            key={key}
            type={relax.element.tag}
            dropInfo={{id: relax.element.id}}
            {...settings.drop}
            placeholder
            style={{position: 'relative'}}
          >
            {content}
          </Droppable>
        );
      } else {
        result = content;
      }
    }

    const style = {};
    if (columns > 1) {
      style.width = `${100 / columns}%`;

      const isLinkingData = this.isLinkingData();
      const property = !dummy && isLinkingData && 'border' || 'padding';

      if (isFirst) {
        style[`${property}Right`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else if (isLast) {
        style[`${property}Left`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else {
        style[`${property}Right`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
        style[`${property}Left`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      }

      if (dummy && isLinkingData) {
        style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      }
    }

    return (
      <div className={cx(columns > 1 && classes.column)} style={style}>
        {result}
      </div>
    );
  }
}
