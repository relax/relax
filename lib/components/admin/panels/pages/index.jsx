import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
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
            sorts={[{label: 'Date', property: 'date'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/pages'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.pages} />
        </div>
      </div>
    );
  }
}

Pages.contextTypes = {
  pages: React.PropTypes.array.isRequired,
  query: React.PropTypes.object
};
