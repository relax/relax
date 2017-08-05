import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import Line from './line';
import styles from './index.less';

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    columnsProps: PropTypes.array,
    renderCell: PropTypes.func.isRequired,
    onRowClick: PropTypes.func
  };

  render () {
    const {columns, data} = this.props;
    return (
      <table className={styles.root}>
        <thead>
          <tr className={styles.header}>
            {columns.map(this.renderColumnHeader, this)}
          </tr>
        </thead>
        <tbody>
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
    const {columns, renderCell, columnsProps, onRowClick} = this.props;

    return (
      <Line
        key={index}
        item={item}
        renderCell={renderCell}
        columns={columns}
        columnsProps={columnsProps}
        onClick={onRowClick}
      />
    );
  }
}
