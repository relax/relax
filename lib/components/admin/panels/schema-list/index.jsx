import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import A from '../../../a';
import Breadcrumbs from '../../../breadcrumbs';
import Filter from '../../../filter';
import List from './list';
import Pagination from '../../../pagination';

export default class Schema extends Component {
  static fragments = mergeFragments({
    schemaListCount: {
      count: 1
    },
    schema: {
      _id: 1,
      slug: 1,
      title: 1
    }
  }, List.fragments)

  static propTypes = {
    schema: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    schemaList: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    query: PropTypes.object,
    removeSchemaEntry: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  render () {
    const newLink = '/admin/schema/' + this.props.schema._id + '/new';
    const link = '/admin/schema/' + this.props.schema._id;
    const breadcrumbs = this.props.breadcrumbs.slice();
    breadcrumbs.push({
      label: this.props.schema.title
    });
    return (
      <div className='admin-schema'>
        <div className='filter-menu'>
          <Breadcrumbs data={breadcrumbs} />
          <A href={newLink} className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new entry</span>
          </A>
          <Filter
            sorts={[
              {label: 'Date', property: '_id'},
              {label: 'Title', property: 'title'},
              {label: 'Slug', property: 'slug'}
            ]}
            url={link}
            search='title'
            query={this.props.query}
            history={this.props.history}
          />
        </div>
        <div className='admin-scrollable'>
          <List
            schemaList={this.props.schemaList}
            schema={this.props.schema}
            removeSchemaEntry={this.props.removeSchemaEntry}
          />
          <Pagination
            url={link}
            query={this.props.query}
            count={this.props.count}
          />
        </div>
      </div>
    );
  }
}
