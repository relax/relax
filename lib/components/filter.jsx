import cx from 'classnames';
import merge from 'lodash.merge';
import React from 'react';
import {Component} from 'relax-framework';

import A from './a';
import Utils from '../utils';

export default class Filter extends Component {
  static propTypes = {
    sorts: React.PropTypes.array.isRequired,
    url: React.PropTypes.string.isRequired,
    search: React.PropTypes.string.isRequired,
    query: React.PropTypes.object,
    history: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      search: (this.props.query && this.props.query.s) || ''
    };
  }

  searchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  searchSubmit (event) {
    event.preventDefault();

    const query = Object.assign({}, this.props.query || {});

    if (this.state.search !== '') {
      merge(query, {search: this.props.search, s: this.state.search});
    } else {
      delete query.search;
      delete query.s;
    }

    const url = Utils.parseQueryUrl(this.props.url, query);

    this.props.history.pushState({}, url);
  }

  render () {
    return (
      <div className='filter-right'>
        <span className='label-filter'>Sort by:</span>
        {this.props.sorts.map(this.renderSortButton, this)}
        <form onSubmit={this.searchSubmit.bind(this)}>
          <input type='text' placeholder='Search' value={this.state.search} onChange={this.searchChange.bind(this)} />
        </form>
      </div>
    );
  }

  renderSortButton (button, key) {
    let active = false;
    let icon = 'arrow_drop_down';

    var query = Object.assign({}, this.props.query || {}, {
      sort: button.property,
      order: 'asc'
    });

    if (this.props.query && this.props.query.sort && this.props.query.sort === button.property) {
      active = true;
      if (!this.props.query.order || this.props.query.order === 'asc') {
        icon = 'arrow_drop_up';
        query.order = 'desc';
      }
    }

    return (
      <A
        className={cx('button-filter', active && 'active')}
        href={Utils.parseQueryUrl(this.props.url, query)}
        key={key}
      >
        <span>{button.label}</span>
        {active && <i className='material-icons'>{icon}</i>}
      </A>
    );
  }
}
