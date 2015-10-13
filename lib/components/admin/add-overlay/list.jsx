import React from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';

// import pagesStore from '../../../client/stores/pages';

export default class List extends Component {
  getInitialState () {
    return {
      pages: []
    };
  }

  renderEntry (page) {
    return <Entry page={page} />;
  }

  render () {
    return (
      <div className='list'>
        {this.state.pages.map(this.renderEntry, this)}
      </div>
    );
  }
}
