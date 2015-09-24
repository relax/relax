import React from 'react';
import {Component} from 'relax-framework';
import {Router} from 'relax-framework';
import A from './a';
import Utils from '../utils';
import merge from 'lodash.merge';
import cx from 'classnames';

export default class Filter extends Component {
  getInitialState () {
    return {
      search: (this.context.query && this.context.query.s) || '',
    };
  }

  searchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  searchSubmit (event) {
    event.preventDefault();

    var query = merge({}, this.context.query || {});

    if (this.state.search !== '') {
      merge(query, {search: this.props.search, s: this.state.search});
    } else {
      delete query.search;
      delete query.s;
    }

    var url = Utils.parseQueryUrl(this.props.url, query);

    Router.prototype.navigate(url, {trigger: true});
  }

  renderSortButton (button, key) {
    let active = false, icon = 'arrow_drop_down';

    var query = {
      sort: button.property,
      order: 'asc'
    };
    if (this.context.query && this.context.query.sort && this.context.query.sort === button.property) {
      active = true;

      if (!this.context.query.order || this.context.query.order === 'asc') {
        icon = 'arrow_drop_up';
        query.order = 'desc';
      }
    }

    return (
      <A
        className={cx('button-filter', active && 'active')}
        href={Utils.parseQueryUrl(this.props.url, query)}
        key={key}>
        <span>{button.label}</span>
        {active && <i className='material-icons'>{icon}</i>}
      </A>
    );
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
}

Filter.propTypes = {
  sorts: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired,
  search: React.PropTypes.string.isRequired
};

Filter.contextTypes = {
  query: React.PropTypes.object
};
