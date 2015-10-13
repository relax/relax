import React from 'react';
import {Component, mergeFragments} from 'relax-framework';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';

export default class Pages extends Component {
  static fragments = mergeFragments({
    pagesCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: React.PropTypes.array.isRequired,
    pages: React.PropTypes.array,
    query: React.PropTypes.object,
    pagesCount: React.PropTypes.object
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
            count={this.props.pagesCount && this.props.pagesCount.count}
          />
        </div>
      </div>
    );
  }
}
