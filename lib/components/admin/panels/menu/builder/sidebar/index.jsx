import {Component} from 'relax-framework';
import React, {PropTypes} from 'react';

import Category from './category';
import Custom from './custom';
import Entry from './entry';

export default class Sidebar extends Component {
  static fragments = {
    pages: Entry.fragments.page
  }

  static propTypes = {
    pages: PropTypes.array
  }

  getInitialState () {
    return {
      search: ''
    };
  }

  onSearchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  render () {
    return (
      <div className='menu-builder-sidebar'>
        <Category title='Pages' icon='insert_drive_file'>
          {this.props.pages.map(this.renderPageEntry, this)}
        </Category>
        <Category title='Custom' icon='link'>
          <Custom />
        </Category>
      </div>
    );
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
}
