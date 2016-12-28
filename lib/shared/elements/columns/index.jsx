import Component from 'components/component';
import forEach from 'lodash/forEach';
import React, {PropTypes, cloneElement} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import styleSettings from './style';

export default class ColumneElement extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static defaultChildren = [
    {tag: 'Column'}, {tag: 'Column'}
  ];
  static propsSchema = propsSchema;
  static settings = settings;
  static style = styleSettings;

  getGrid () {
    const {renderChildren} = this.props;
    const grid = [];
    const children = renderChildren();

    // traverse columns and calculate grid
    forEach(children, (column) => {
      const {width, widthValue} = column.props.relax.styleValues;

      if (!column.props.relax) {
        return false;
      }

      if (width === 'block') {
        grid.push({
          type: 'block',
          item: column
        });
      } else {
        // Add new columns if none exist or last one is block
        if (grid.length === 0 || grid[grid.length - 1].type === 'block') {
          grid.push({
            type: 'columns',
            autos: 0,
            fixedSizes: [],
            widthTypes: [],
            items: []
          });
        }

        // Column
        const columns = grid[grid.length - 1];

        // add column
        columns.items.push(column);
        columns.widthTypes.push(width);

        if (width === 'auto') {
          columns.autos ++;
        } else {
          columns.fixedSizes.push(widthValue);
        }
      }
    });

    return grid;
  }

  render () {
    const {styleClassMap, relax} = this.props;
    const {Element} = this.context;

    return (
      <Element
        {...relax}
        htmlTag='div'
        settings={settings}
        className={styleClassMap.root}
      >
        {this.renderGrid()}
      </Element>
    );
  }

  renderGrid () {
    const result = [];
    const grid = this.getGrid();

    forEach(grid, (row, key) => {
      const isLast = key === grid.length - 1;

      if (row.type === 'block') {
        result.push(this.renderBlock(row.item, key, isLast));
      } else if (row.items.length === 1) {
        result.push(this.renderBlock(row.items[0], key, isLast));
      } else {
        result.push(this.renderColumns(row, key, isLast));
      }
    });

    return result;
  }

  renderBlock (item, key, isLast) {
    return this.renderRow({
      type: 'block',
      children: [cloneElement(item, {type: 'block'})],
      key,
      isLast
    });
  }

  renderColumns (row, key, isLast) {
    const {relax} = this.props;
    let totalWidth;

    // calculate spacings
    const spacing = relax.styleValues.spacing;
    const spacingNum = parseFloat(spacing, 10);
    const spaceThird = Math.round(spacingNum / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    // calculate autos
    if (row.autos === 0 && row.fixedSizes.length) {
      totalWidth = 'calc(';

      forEach(row.fixedSizes, (fixedSize, it) => {
        if (it !== 0) {
          totalWidth += ' + ';
        }
        totalWidth += fixedSize;
      });

      totalWidth += ')';
    }

    const columns = row.items.map((column, it) => {
      let left = 0;
      let right = 0;

      if (it === 0) {
        right = spaceSides;
      } else if (it === row.items.length - 1) {
        left = spaceSides;
      } else {
        left = spaceThird;
        right = spaceThird;
      }

      return cloneElement(column, {
        type: 'column',
        left,
        right
      });
    });

    return this.renderRow({
      type: 'columns',
      children: columns,
      key,
      isLast,
      totalWidth
    });
  }

  renderRow ({children, key, type, isLast, totalWidth}) {
    const {relax} = this.props;
    let className = type !== 'block' && classes.row;
    let style = {};
    let result;

    if (!isLast) {
      style.marginBottom = relax.styleValues.spacingRows;
    }

    if (totalWidth) {
      const {horizontal} = relax.styleValues;

      style.position = 'relative';
      style.left = horizontal;
      style.transform = `translateX(-${horizontal})`;
      style.width = totalWidth;
    }

    // TODO let blocks to have droppable as well
    if (relax.editing && !relax.disableSelection && type !== 'block') {
      const {Element} = this.context;
      const customDropProps = {
        className,
        style,
        key
      };

      result = Element.renderContent({
        relax,
        customDropProps,
        children,
        settings
      });
    } else {
      result = (
        <div className={className} style={style} key={key}>
          {children}
        </div>
      );
    }

    return result;
  }
}
