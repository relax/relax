import React from 'react';
import {Component} from 'relax';
import cx from 'classnames';

import Entry from './entry';

import pagesStore from '../../../../client/stores/pages';

export default class List extends Component {
  getInitialState () {
    return {
      pages: []
    };
  }

  getInitialCollections () {
    return {
      pages: pagesStore.getCollection()
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
