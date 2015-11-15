import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import classes from './classes';
import settings from './settings';
import {Droppable} from '../../dnd';

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    limit: PropTypes.number,
    columns: PropTypes.number,
    renderChildren: PropTypes.func.isRequired,
    verticalGutter: PropTypes.number.isRequired,
    horizontalGutter: PropTypes.number.isRequired,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    dnd: PropTypes.object,
    dndActions: PropTypes.object,
    element: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired
  }

  render () {
    const items = [];
    for (let i = 0; i < this.props.limit; i) {
      if (this.props.columns > 1) {
        const columnItems = [];
        for (let a = 0; a < this.props.columns && i < this.props.limit; a++) {
          columnItems.push(this.renderItem(i, a === 0, a === this.props.columns - 1));
          i++;
        }
        items.push(this.renderRow(columnItems, i >= this.props.limit));
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
      style.marginBottom = this.props.verticalGutter + 'px';
    }

    return (
      <div className={cx(classes.row)} style={style}>{items}</div>
    );
  }

  renderItem (key, isFirst, isLast) {
    let result;
    const editing = this.props.pageBuilder && this.props.pageBuilder.editing;
    const content = this.props.children && this.props.renderChildren(this.props.element.children, {});
    const spaceThird = Math.round(this.props.horizontalGutter / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    if (editing) {
      result = (
        <Droppable
          key={key}
          type={this.props.element.tag}
          dropInfo={{id: this.props.elementId}}
          {...settings.drop}
          placeholder
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
          style={{position: 'relative'}}
        >
          {content}
        </Droppable>
      );
    } else {
      result = content;
    }

    const style = {};
    if (this.props.columns > 1) {
      style.width = (100 / this.props.columns) + '%';

      if (isFirst) {
        style.paddingRight = spaceSides;
      } else if (isLast) {
        style.paddingLeft = spaceSides;
      } else {
        style.paddingRight = spaceThird;
        style.paddingLeft = spaceThird;
      }
    }

    return (
      <div className={cx(this.props.columns > 1 && classes.column)} style={style}>
        {result}
      </div>
    );
  }
}
