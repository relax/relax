import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import List from './list';
import Pagination from '../../../pagination';

export default class Pages extends Component {
  static fragments = mergeFragments({
    pagesCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    pages: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    removePage: PropTypes.func,
    duplicatePage: PropTypes.func,
    history: PropTypes.object.isRequired
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
            history={this.props.history}
          />
        </div>
        <div className='admin-scrollable'>
          <List
            pages={this.props.pages}
            removePage={this.props.removePage}
            duplicatePage={this.props.duplicatePage}
          />
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
