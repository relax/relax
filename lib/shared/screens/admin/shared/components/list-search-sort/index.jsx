import cx from 'classnames';
import find from 'lodash.find';
import Balloon from 'components/balloon';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './index.less';

@connect(
  (state) => ({
    location: state.router.location
  })
)
export default class ListSearchSort extends Component {
  static propTypes = {
    sorts: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  toggleSorts () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {sort, order, sorts} = this.props;
    const selected = find(sorts, (obj) => obj.sort === sort && obj.order === order);

    return (
      <div className={styles.root}>
        <label className={styles.searchLabel}>
          <i className='nc-icon-mini ui-1_zoom'></i>
          <input type='text' className={styles.search} placeholder='Search..' />
        </label>
        <div className={styles.sort} onClick={::this.toggleSorts} ref='sort'>
          <span>{selected.label}</span>
          <i className='nc-icon-mini arrows-1_minimal-down'></i>
        </div>
        {this.renderSorts()}
      </div>
    );
  }

  renderSorts () {
    if (this.state.opened) {
      const {sorts} = this.props;
      return (
        <Balloon
          element={this.refs.sort}
          stickOptions={{horizontalPosition: 'center', onClose: ::this.toggleSorts}}
          white
          small
          unpadded
        >
          {sorts.map(this.renderSort, this)}
        </Balloon>
      );
    }
  }

  renderSort (sort, key) {
    const {location} = this.props;
    const active = this.props.sort === sort.sort && this.props.order === sort.order;
    const query = Object.assign({}, location.query, {
      sort: sort.sort,
      order: sort.order
    });
    return (
      <Link to={location.pathname} query={query} className={cx(styles.sortOption, active && styles.active)} key={key}>
        {sort.label}
      </Link>
    );
  }
}
