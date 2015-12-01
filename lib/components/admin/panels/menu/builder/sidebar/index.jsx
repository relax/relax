import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Category from './category';
import Custom from './custom';
import Entry from './entry';

export default class Sidebar extends Component {
  static fragments = {
    pages: Entry.fragments.page
  }

  static propTypes = {
    pages: PropTypes.array,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  getInitState () {
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
          <Custom dnd={this.props.dnd} dndActions={this.props.dndActions} />
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
      <Entry entry={menuEntry} key={entry._id} dnd={this.props.dnd} dndActions={this.props.dndActions} />
    );
  }
}
