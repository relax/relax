import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import A from '../../../a';
import Filter from '../../../filter';
import Breadcrumbs from '../../../breadcrumbs';

import schemaEntriesStoreFactory from '../../../../client/stores/schema-entries';

export default class Schema extends Component {
  getInitialState () {
    return {
      schemaEntries: this.context.schemaEntries
    };
  }

  getInitialCollections () {
    return {
      schemaEntries: schemaEntriesStoreFactory(this.context.schema.slug).getCollection()
    };
  }

  render () {
    const newLink = '/admin/schema/'+this.context.schema.slug+'/new';
    return (
      <div className='admin-schema'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
          <A href={newLink} className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new entry</span>
          </A>
          <Filter
            sorts={[{label: 'Date', property: '_date'}, {label: 'Title', property: '_title'}, {label: 'Slug', property: '_slug'}]}
            url={'/admin/schema/'+this.context.schema.slug}
            search='_title'
          />
        </div>
        <div className='admin-scrollable'>
          <List schemaEntries={this.state.schemaEntries} />
        </div>
      </div>
    );
  }
}

Schema.contextTypes = {
  schemaEntries: React.PropTypes.array.isRequired,
  schema: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired
};
