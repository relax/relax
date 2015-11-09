import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    pages: Entry.fragments.page
  }

  static propTypes = {
    pages: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='list'>
        {this.props.pages.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (page) {
    return <Entry page={page} onClose={this.props.onClose} />;
  }
}
