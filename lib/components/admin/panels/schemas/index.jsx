import React from 'react';
import {Component} from 'relax-framework';
import List from './list';
import Filter from '../../../filter';
import A from '../../../a';

import schemasStore from '../../../../client/stores/schemas';

export default class Schemas extends Component {
  getInitialState () {
    return {
      opened: false,
      schemas: this.context.schemas
    };
  }

  getInitialCollections () {
    return {
      schemas: schemasStore.getCollection()
    };
  }

  render () {
    return (
      <div className='admin-schemas'>
        <div className='filter-menu'>
          <span className='admin-title'>Schemas</span>
          <A href='/admin/schemas/new' className='button-clean'>
            <i className='material-icons'>library_add</i>
            <span>Add new schema</span>
          </A>
          <Filter
            sorts={[{label: 'Title', property: 'title'}, {label: 'Slug', property: 'slug'}]}
            url='/admin/schemas'
            search='title'
          />
        </div>
        <div className='admin-scrollable'>
          <List data={this.state.schemas} />
        </div>
      </div>
    );
  }
}

Schemas.contextTypes = {
  schemas: React.PropTypes.array.isRequired
};
