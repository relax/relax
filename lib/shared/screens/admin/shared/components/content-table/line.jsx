import React from 'react';
import PropTypes from 'prop-types';

import Cell from './cell';
import Component from 'components/component';
import bind from 'decorators/bind';
import styles from './line.less';

export default class Column extends Component {
  static propTypes = {
    item: PropTypes.any.isRequired,
    renderCell: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    columnsProps: PropTypes.array,
    onClick: PropTypes.func
  };

  @bind
  onClick () {
    const {onClick, item} = this.props;
    onClick && onClick(item);
  }

  render () {
    const {columns} = this.props;
    return (
      <tr className={styles.root} onClick={this.onClick}>
        {columns.map(this.renderCell, this)}
      </tr>
    );
  }

  renderCell (label, columnIndex) {
    const {item, renderCell, columnsProps} = this.props;
    return (
      <Cell key={columnIndex}>
        {renderCell({
          item,
          columnProps: columnsProps && columnsProps[columnIndex]
        })}
      </Cell>
    );
  }
}
