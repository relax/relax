import React from 'react';
import {Component} from 'relax-framework';
import {Router} from 'relax-framework';
import A from './a';
import Utils from '../utils';
import merge from 'lodash.merge';

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

    if(this.state.search !== ''){
      merge(query, {search: this.props.search, s: this.state.search});
    } else {
      delete query.search;
      delete query.s;
    }

    var url = Utils.parseQueryUrl(this.props.url, query);

    Router.prototype.navigate(url, {trigger: true});
  }

  renderSortButton (button, key) {
    var props = {
      className: 'button-filter'
    };

    var query = {
      sort: button.property,
      order: 'asc'
    };
    if(this.context.query && this.context.query.sort && this.context.query.sort === button.property) {
      props.className += ' active';

      if(!this.context.query.order || this.context.query.order === 'asc'){
        query.order = 'desc';
      }
    }

    props.href = Utils.parseQueryUrl(this.props.url, query);

    return (
      <A {...props} key={key}>{button.label}</A>
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
