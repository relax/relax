import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Lightbox from '../../../lightbox';
import Filter from '../../../filter';
import Manage from './manage';
import Breadcrumbs from '../../../breadcrumbs';

import schemaEntriesStoreFactory from '../../../../client/stores/schema-entries';

export default class Schema extends Component {
  getInitialState () {
    return {
      opened: false,
      schema: this.context.schema,
      schemaEntries: this.context.schemaEntries
    };
  }

  getInitialCollections () {
    return {
      schemaEntries: schemaEntriesStoreFactory(this.context.schema.slug).getCollection()
    };
  }

  addNewClick (event) {
    event.preventDefault();

    this.setState({
      opened: true
    });
  }

  onClose () {
    this.setState({
      opened: false
    });
  }

  renderLightbox () {
    if(this.state.opened){
      var title = 'Add new entry to ' + this.state.schema.title;
      return (
        <Lightbox onClose={this.onClose.bind(this)} title={title}>
          <Manage schema={this.state.schema} />
        </Lightbox>
      );
    }
  }

  render () {
    return (
      <div className='admin-schema'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
          <a href='#' className='button-clean' onClick={this.addNewClick.bind(this)}>
            <i className='material-icons'>library_add</i>
            <span>Add new entry</span>
          </a>
          <Filter
            sorts={[{label: 'Date', property: 'date'}, {label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url={'/admin/schemas/'+this.state.schema.slug}
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List schemaEntries={this.state.schemaEntries} schema={this.state.schema} />
        </div>
        {this.renderLightbox()}
      </div>
    );
  }
}

Schema.contextTypes = {
  schemaEntries: React.PropTypes.array.isRequired,
  schema: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired
};
