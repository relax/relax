import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import A from '../../../a';

import menusStore from '../../../../client/stores/menus';

export default class Menus extends Component {
  getInitialState () {
    return {
      menus: this.context.menus,
      search: (this.context.query && this.context.query.s) || '',
      lightbox: false
    };
  }

  getInitialCollections () {
    return {
      menus: menusStore.getCollection()
    };
  }

  render () {
    return (
      <div className='admin-menus'>
        <div className='filter-menu'>
          <span className='admin-title'>Menus</span>
          <A href='/admin/menus/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new menu</span>
          </A>
          <Filter
            sorts={[{label: 'Date', property: '_id'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/menus'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.menus} />
          <Pagination url='/admin/menus' />
        </div>
      </div>
    );
  }
}

Menus.contextTypes = {
  menus: React.PropTypes.array.isRequired,
  query: React.PropTypes.object
};
