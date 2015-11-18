import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import List from './list';
import Pagination from '../../../pagination';

export default class Schemas extends Component {
  static fragments = mergeFragments({
    schemasCount: {
      count: 1
    }
  }, List.fragments)

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    schemas: PropTypes.array,
    query: PropTypes.object,
    count: PropTypes.number,
    removeSchema: PropTypes.func,
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='admin-schemas'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <A href='/admin/schemas/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new schema</span>
          </A>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Title', property: 'title'},
              {label: 'Slug', property: 'slug'}
            ]}
            url='/admin/schemas'
            search='title'
            query={this.props.query}
            history={this.props.history}
          />
        </div>
        <div className='admin-scrollable'>
          <List
            schemas={this.props.schemas}
            removeSchema={this.props.removeSchema}
          />
          <Pagination
            url='/admin/schemas'
            query={this.props.query}
            count={this.props.count}
          />
        </div>
      </div>
    );
  }
}
