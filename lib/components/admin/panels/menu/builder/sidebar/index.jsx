import {Component} from 'relax-framework';
import React from 'react';

import Category from './category';
import Custom from './custom';
import Entry from './entry';

import pagesStore from '../../../../../../client/stores/pages';

export default class Sidebar extends Component {
  getInitialState () {
    return {
      pages: this.context.pages || [],
      search: ''
    };
  }

  getInitialCollections () {
    return {
      pages: pagesStore.getCollection()
    };
  }

  onSearchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  renderPageEntry (entry, key) {
    const menuEntry = {
      type: 'page',
      page: entry
    };
    return (
      <Entry entry={menuEntry} key={entry._id} />
    );
  }

  render () {
    return (
      <div className='menu-builder-sidebar'>
        <Category title='Pages' icon='insert_drive_file'>
          {this.state.pages.map(this.renderPageEntry, this)}
        </Category>
        <Category title='Custom' icon='link'>
          <Custom />
        </Category>
      </div>
    );
  }
}

Sidebar.contextTypes = {
  pages: React.PropTypes.array
};
