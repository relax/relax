import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import A from '../../../a';

import pagesStore from '../../../../client/stores/pages';

export default class Pages extends Component {
  getInitialState () {
    return {
      pages: this.context.pages,
      search: (this.context.query && this.context.query.s) || '',
      lightbox: false
    };
  }

  getInitialCollections () {
    return {
      pages: pagesStore.getCollection()
    };
  }

  render () {
    return (
      <div className='admin-pages'>
        <div className='filter-menu'>
          <span className='admin-title'>Pages</span>
          <A href='/admin/pages/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new page</span>
          </A>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/pages'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.pages} />
          <Pagination url='/admin/pages' />
        </div>
      </div>
    );
  }
}

Pages.contextTypes = {
  pages: React.PropTypes.array.isRequired,
  query: React.PropTypes.object
};
