import utils from 'helpers/utils';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Element from '../element';

export default class Columns extends Component {
  static propTypes = {
    spacing: PropTypes.string,
    spacingRows: PropTypes.string,
    columnsDisplay: PropTypes.array.isRequired,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    spacing: '10px',
    spacingRows: '10px',
    columnsDisplay: []
  };

  static defaultChildren = [
    {tag: 'Column'}, {tag: 'Column'}
  ];
  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    return (
      <Element {...this.props.relax} htmlTag='div' settings={settings}>
        {this.renderChildren()}
      </Element>
    );
  }

  renderChildren () {
    const {columnsDisplay, relax, spacing} = this.props;
    const children = [];
    const numChildren = this.props.children && this.props.children.length || 0;
    const layout = utils.parseColumnsDisplay(columnsDisplay, numChildren, relax.display !== 'desktop');
    const editing = relax.editing;

    const spacingNum = parseFloat(spacing, 10);
    const spaceThird = Math.round(spacingNum / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;
    let result;

    const dropInfo = {
      id: relax.element.id
    };

    if (numChildren > 0) {
      for (let i = 0; i < numChildren; i++) {
        if (layout[i].width === 'block') {
          children.push(this.renderBlock(
            this.props.children[i],
            layout[i],
            i !== numChildren - 1 ? spacingNum : 0
          ));
        } else {
          const columns = [];
          for (i; i < numChildren; i++) {
            if (layout[i].width !== 'block' && !(columns.length > 0 && layout[i].break)) {
              const isLastColumn = (
                columns.length !== 0 &&
                (i === numChildren - 1 || (layout[i + 1].width === 'block' || layout[i + 1].break))
              );
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

          if (editing && relax.display === 'desktop') {
            result = (
              <Droppable
                type={relax.element.tag}
                dropInfo={dropInfo}
                {...settings.drop}
                className={classes.row}
                placeholder
              >
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
          type={relax.element.tag}
          dropInfo={dropInfo}
          {...settings.drop}
          className={classes.row}
          placeholder
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
