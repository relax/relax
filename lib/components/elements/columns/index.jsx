import React from 'react';

import jss from '../../../helpers/stylesheet';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import Utils from '../../../utils';
import {Droppable} from '../../dnd';

export default class Columns extends Component {

  renderBlock (child, layout, bottom) {
    return React.cloneElement(child, {
      layout,
      bottom
    });
  }

  renderColumn (child, layout, left, right) {
    return React.cloneElement(child, {
      layout,
      left,
      right
    });
  }

  renderChildren () {
    var children = [], i, numChildren = this.props.children.length;
    const layout = Utils.parseColumnsDisplay(this.props[this.context.display], numChildren, this.context.display !== 'desktop');

    const spaceThird = Math.round(this.props.spacing / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    var dropInfo = {
      id: this.props.element.id
    };

    if (numChildren > 0) {
      for (i = 0; i < numChildren; i++) {
        if (layout[i].width === 'block') {
          children.push(this.renderBlock(this.props.children[i], layout[i], i !== numChildren - 1 ? this.props.spacing : 0));
        } else {
          var columns = [];
          for (i; i < numChildren; i++) {
            if (layout[i].width !== 'block' && !(columns.length > 0 && layout[i].break)) {
              let isLastColumn = (columns.length !== 0 && (i === numChildren - 1 || (layout[i + 1].width === 'block' || layout[i + 1].break)));
              let left = columns.length === 0 ? 0 : (isLastColumn ? spaceSides : spaceThird);
              let right = columns.length === 0 ? spaceSides : (isLastColumn ? 0 : spaceThird);

              columns.push(this.renderColumn(this.props.children[i], layout[i], left, right));
            } else {
              i--;
              break;
            }
          }

          if (this.context.editing && this.context.display === 'desktop') {
            return (
              <Droppable type={this.props.element.tag} dropInfo={dropInfo} {...this.constructor.settings.drop} className={classes.row} placeholder={true}>
                {columns}
              </Droppable>
            );
          } else {
            let style = {};

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
    } else if (this.context.editing) {
      return (
        <Droppable type={this.props.element.tag} dropInfo={dropInfo} {...this.constructor.settings.drop} className={classes.row} placeholder={true}></Droppable>
      );
    }


    return children;
  }

  render () {
    return (
      <Element tag='div' settings={this.constructor.settings} element={this.props.element}>
        {this.renderChildren()}
      </Element>
    );
  }
}

var classes = jss.createRules({
  row: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%'
  }
});

Columns.contextTypes = {
  editing: React.PropTypes.bool.isRequired,
  display: React.PropTypes.string.isRequired
};

Columns.propTypes = {
  spacing: React.PropTypes.number.isRequired,
  spacingRows: React.PropTypes.number.isRequired,
  desktop: React.PropTypes.array.isRequired,
  tablet: React.PropTypes.array.isRequired,
  mobile: React.PropTypes.array.isRequired
};

Columns.defaultProps = {
  spacing: 10,
  spacingRows: 10,
  desktop: [],
  tablet: [],
  mobile: []
};

Columns.defaultChildren = [
  {tag: 'Column'}, {tag: 'Column'}
];

Columns.settings = settings;
Columns.propsSchema = propsSchema;
