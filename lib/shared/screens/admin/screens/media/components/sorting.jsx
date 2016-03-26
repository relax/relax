import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './sorting.less';

export default class Sorting extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
  };

  reverseOrder (order) {
    return order === 'asc' ? 'desc' : 'asc';
  }

  render () {
    return (
      <div className={styles.root}>
        <span className={styles.label}>Sort by: </span>
        {this.renderSort('Date', '_id')}
        {this.renderSort('Size', 'filesize')}
        {this.renderSort('Dimension', 'dimension')}
      </div>
    );
  }

  renderSort (label, property) {
    const {location, sort, order} = this.props;
    const active = sort === property;
    const query = Object.assign({}, location.query, {
      sort: property,
      order: active ? this.reverseOrder(order) : order
    });

    return (
      <Link to={location} query={query} className={cx(styles.button, active && styles.active)}>
        <span>{label}</span>
        {
          active &&
          <i
            className={cx(
              'nc-icon-outline',
              order === 'asc' ? 'arrows-1_small-triangle-up' : 'arrows-1_small-triangle-down'
            )}
          />
        }
      </Link>
    );
  }
}
