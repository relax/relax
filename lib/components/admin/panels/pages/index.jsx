import React, {PropTypes} from 'react';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import List from './list';
import Filter from '../../../filter';
import Pagination from '../../../pagination';
import queryProps from '../../../../decorators/query-props';

import * as pagesActions from '../../../../actions/pages';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    count: state.pages.data.count
  }),
  (dispatch) => bindActionCreators(pagesActions, dispatch)
)
@queryProps
export default class Pages extends Component {
  static fragments = mergeFragments({
    pagesCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    pages: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    removePage: PropTypes.func
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
      <div className='admin-pages'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <A href='/admin/pages/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new page</span>
          </A>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Title', property: 'title'},
              {label: 'Slug', property: 'slug'}
            ]}
            url='/admin/pages'
            search='title'
            query={this.props.query}
          />
        </div>
        <div className='admin-scrollable'>
          <List pages={this.props.pages} removePage={this.props.removePage} />
          <Pagination
            url='/admin/pages'
            query={this.props.query}
            count={this.props.count}
          />
        </div>
      </div>
    );
  }
}
