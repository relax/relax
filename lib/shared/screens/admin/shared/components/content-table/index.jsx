import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Line from './line';

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    columnsProps: PropTypes.array,
    renderCell: PropTypes.func.isRequired
  };

  render () {
    const {columns, data} = this.props;
    return (
      <table className={styles.root}>
        <tbody>
          <tr className={styles.header}>
            {columns.map(this.renderColumnHeader, this)}
          </tr>
          {data.map(this.renderLine, this)}
        </tbody>
      </table>
    );
  }

  renderColumnHeader (label, index) {
    return (
      <th key={index}>
        {label}
      </th>
    );
  }

  renderLine (item, index) {
    const {columns, renderCell, columnsProps} = this.props;
    return (
      <Line
        key={index}
        item={item}
        renderCell={renderCell}
        columns={columns}
        columnsProps={columnsProps}
      />
    );
  }
}
