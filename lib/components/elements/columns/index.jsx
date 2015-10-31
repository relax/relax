import React from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import Utils from '../../../utils';
import {Droppable} from '../../dnd';

export default class Columns extends Component {
  static propTypes = {
    spacing: React.PropTypes.number.isRequired,
    spacingRows: React.PropTypes.number.isRequired,
    desktop: React.PropTypes.array.isRequired,
    tablet: React.PropTypes.array.isRequired,
    mobile: React.PropTypes.array.isRequired,
    children: React.PropTypes.node,
    element: React.PropTypes.object.isRequired,
    display: React.PropTypes.string.isRequired,
    dnd: React.PropTypes.object.isRequired,
    dndActions: React.PropTypes.object.isRequired,
    pageBuilder: React.PropTypes.object.isRequired,
    pageBuilderActions: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    spacing: 10,
    spacingRows: 10,
    desktop: [],
    tablet: [],
    mobile: []
  }

  static defaultChildren = [
    {tag: 'Column'}, {tag: 'Column'}
  ]
  static settings = settings
  static propsSchema = propsSchema

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
    const layout = Utils.parseColumnsDisplay(this.props[this.props.display], numChildren, this.props.display !== 'desktop');

    const spaceThird = Math.round(this.props.spacing / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    var dropInfo = {
      id: this.props.element.id
    };

    if (numChildren > 0) {
      for (let i = 0; i < numChildren; i++) {
        if (layout[i].width === 'block') {
          children.push(this.renderBlock(this.props.children[i], layout[i], i !== numChildren - 1 ? this.props.spacing : 0));
        } else {
          var columns = [];
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

          if (this.props.pageBuilder.editing && this.props.display === 'desktop') {
            return (
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
    } else if (this.props.pageBuilder.editing) {
      return (
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

    return children;
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
