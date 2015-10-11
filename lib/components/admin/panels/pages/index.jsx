import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';
import List from './list';
// import Filter from '../../../filter';
// import Pagination from '../../../pagination';
import A from '../../../a';
import * as pageActions from '../../../../actions/page';

@connect(
  (state) => ({pages: state.page.data.pages}),
  (dispatch) => bindActionCreators(pageActions, dispatch)
)
export default class Pages extends Component {
  static fragments = List.fragments

  componentWillMount () {
    this.props.getPages(this.constructor.fragments);
  }

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
