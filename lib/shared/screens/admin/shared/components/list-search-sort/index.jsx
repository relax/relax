import bind from 'decorators/bind';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import find from 'lodash.find';
import Balloon from 'components/balloon';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {pushState} from 'redux-router';

import styles from './index.less';

export default class ListSearchSort extends Component {
  static propTypes = {
    sorts: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    search: PropTypes.string,
    order: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    this.searchDebounce = debounce(::this.changeSearch, 300);
    return {
      opened: false,
      focused: false
    };
  }

  toggleSorts () {
    this.setState({
      opened: !this.state.opened
    });
  }

  changeSearch () {
    const {location} = this.props;
    const query = Object.assign({}, location.query, {
      s: this.state.search
    });
    this.context.store.dispatch(pushState(null, location.pathname, query));
  }

  @bind
  onFocus () {
    this.setState({
      focused: true,
      search: this.props.search
    });
  }

  @bind
  onBlur () {
    if (this.state.search !== this.props.search) {
      this.changeSearch();
    }
    this.setState({
      focused: false
    });
  }

  @bind
  updateSearch (event) {
    this.setState({
      search: event.target.value
    });
    this.searchDebounce();
  }

  render () {
    const {focused} = this.state;
    const {sort, order, sorts} = this.props;
    const selected = find(sorts, (obj) => obj.sort === sort && obj.order === order);

    return (
      <div className={styles.root}>
        <label className={styles.searchLabel}>
          <i className='nc-icon-mini ui-1_zoom'></i>
          <input
            type='text'
            value={focused ? this.state.search : this.props.search}
            className={styles.search}
            placeholder='Search..'
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.updateSearch}
          />
        </label>
        <div className={styles.sort} onClick={::this.toggleSorts} ref='sort'>
          <span>{selected && selected.label}</span>
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
      <Link
        to={location.pathname}
        query={query}
        className={cx(styles.sortOption, active && styles.active)}
        key={key}
        onClick={::this.toggleSorts}
      >
        {sort.label}
      </Link>
    );
  }
}
