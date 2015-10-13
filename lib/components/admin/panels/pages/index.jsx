import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
// import Filter from '../../../filter';
// import Pagination from '../../../pagination';
import A from '../../../a';

export default class Pages extends Component {
  static fragments = List.fragments

  render () {
    return (
        <div className='admin-pages'>
          <div className='filter-menu'>
            <span className='admin-title'>Pages</span>
            <List pages={this.props.pages} />
          </div>
          <div className='admin-scrollable'>
          </div>
        </div>
    );
  }
}
