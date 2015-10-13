import React from 'react';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import {connect} from 'react-redux';
import forEach from 'lodash.foreach';

@connect(
  (state) => ({
    pages: state.pages.data.items || [],
    count: state.pages.data.count || 1
  })
)
export default class Pages extends Component {
  static fragments = mergeFragments({
    pagesCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: React.PropTypes.array.isRequired,
    pages: React.PropTypes.object,
    query: React.PropTypes.object,
    count: React.PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    if (this.queryChanged(nextProps.query)) {
      const vars = {
        pages: {
          sort: {
            value: nextProps.query.sort,
            type: 'String'
          },
          order: {
            value: nextProps.query.order,
            type: 'String'
          },
          limit: {
            value: nextProps.query.limit,
            type: 'Int'
          },
          page: {
            value: nextProps.query.page,
            type: 'Int'
          }
        }
      };
      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done(() => {

        });
    }
  }

  queryChanged (newQuery) {
    const currentQuery = this.props.query;
    let changed = !newQuery && currentQuery || newQuery && !currentQuery;

    if (!changed && newQuery) {
      forEach(newQuery, (value, key) => {
        if (!currentQuery[key] || currentQuery[key] !== value) {
          changed = true;
        }
      });
    }
    if (!changed && currentQuery) {
      forEach(currentQuery, (value, key) => {
        if (!newQuery[key] || newQuery[key] !== value) {
          changed = true;
        }
      });
    }
    return changed;
  }

  render () {
    return (
      <div className='admin-pages'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <A href='/admin/pages/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new page</span>
          </A>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Title', property: 'title'},
              {label: 'Slug', property: 'slug'}
            ]}
            url='/admin/pages'
            search='title'
            query={this.props.query}
            />
        </div>
        <div className='admin-scrollable'>
          <List pages={this.props.pages} />
          <Pagination
            url='/admin/pages'
            query={this.props.query}
            count={this.props.count}
          />
        </div>
      </div>
    );
  }
}
