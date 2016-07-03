import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './line.less';
import Cell from './cell';

export default class Column extends Component {
  static propTypes = {
    item: PropTypes.any.isRequired,
    renderCell: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    columnsProps: PropTypes.array
  };

  render () {
    const {columns} = this.props;
    return (
      <tr className={styles.root}>
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
