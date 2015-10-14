import React, {PropTypes} from 'react';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Breadcrumbs from '../../../breadcrumbs';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import A from '../../../a';

import * as menusActions from '../../../../actions/menus';

@connect(
  (state) => ({
    menus: state.menus.data.items,
    count: state.menus.data.count
  }),
  (dispatch) => bindActionCreators(menusActions, dispatch)
)
export default class Menus extends Component {
  static fragments = mergeFragments({
    menusCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    menus: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removeMenu: PropTypes.func,
    duplicateMenu: PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        pages: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  render () {
    return (
      <div className='admin-menus'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <A href='/admin/menus/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new menu</span>
          </A>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Title', property: 'title'},
              {label: 'Slug', property: 'slug'}
            ]}
            url='/admin/menus'
            search='title'
            query={this.props.query}
          />
        </div>
        <div className='admin-scrollable'>
          <List
            menus={this.props.menus}
            removeMenu={this.props.removeMenu}
            duplicateMenu={this.props.duplicateMenu}
          />
          <Pagination
            url='/admin/menus'
            query={this.props.query}
            count={this.props.count}
          />
        </div>
      </div>
    );
  }
}
