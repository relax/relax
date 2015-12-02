import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import Utils from '../../../utils';
import {Droppable} from '../../dnd';

export default class Columns extends Component {
  static propTypes = {
    spacing: PropTypes.number.isRequired,
    spacingRows: PropTypes.number.isRequired,
    columnsDisplay: PropTypes.array.isRequired,
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    dnd: PropTypes.object,
    dndActions: PropTypes.object,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object
  }

  static defaultProps = {
    spacing: 10,
    spacingRows: 10,
    columnsDisplay: []
  }

  static defaultChildren = [
    {tag: 'Column'}, {tag: 'Column'}
  ]
  static propsSchema = propsSchema
  static settings = settings

  render () {
    return (
      <Element info={this.props} htmlTag='div' settings={settings}>
        {this.renderChildren()}
      </Element>
    );
  }

  renderChildren () {
    const children = [];
    const numChildren = this.props.children && this.props.children.length || 0;
    const layout = Utils.parseColumnsDisplay(this.props.columnsDisplay, numChildren, this.props.display !== 'desktop');
    const editing = this.props.pageBuilder && this.props.pageBuilder.editing;

    const spaceThird = Math.round(this.props.spacing / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;
    let result;

    var dropInfo = {
      id: this.props.element.id
    };

    if (numChildren > 0) {
      for (let i = 0; i < numChildren; i++) {
        if (layout[i].width === 'block') {
          children.push(this.renderBlock(this.props.children[i], layout[i], i !== numChildren - 1 ? this.props.spacing : 0));
        } else {
          const columns = [];
          for (i; i < numChildren; i++) {
            if (layout[i].width !== 'block' && !(columns.length > 0 && layout[i].break)) {
              const isLastColumn = (columns.length !== 0 && (i === numChildren - 1 || (layout[i + 1].width === 'block' || layout[i + 1].break)));
              let left;
              let right;

              if (columns.length === 0) {
                left = 0;
                right = spaceSides;
              } else if (isLastColumn) {
                left = spaceSides;
                right = 0;
              } else {
                left = spaceThird;
                right = spaceThird;
              }

              columns.push(this.renderColumn(this.props.children[i], layout[i], left, right));
            } else {
              i--;
              break;
            }
          }

          if (editing && this.props.display === 'desktop') {
            result = (
              <Droppable
                type={this.props.element.tag}
                dropInfo={dropInfo}
                {...settings.drop}
                className={classes.row}
                placeholder
                dnd={this.props.dnd}
                dndActions={this.props.dndActions}
                pageBuilder={this.props.pageBuilder}
                pageBuilderActions={this.props.pageBuilderActions}>
                {columns}
              </Droppable>
            );
            break;
          } else {
            const style = {};

            if (i < numChildren - 1) {
              style.paddingBottom = this.props.spacingRows;
            }

            children.push(
              <div className={classes.row} key={i} style={style}>
                {columns}
              </div>
            );
          }
        }
      }
    } else if (editing) {
      result = (
        <Droppable
          type={this.props.element.tag}
          dropInfo={dropInfo}
          {...settings.drop}
          className={classes.row}
          placeholder
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}
          pageBuilder={this.props.pageBuilder}
          pageBuilderActions={this.props.pageBuilderActions}
        />
      );
    }

    return result || children;
  }

  renderColumn (child, layout, left, right) {
    return React.cloneElement(child, {
      layout,
      left,
      right
    });
  }

  renderBlock (child, layout, bottom) {
    return React.cloneElement(child, {
      layout,
      bottom
    });
  }
}
