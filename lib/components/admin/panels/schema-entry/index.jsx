import {Component} from 'relax-framework';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import clone from 'lodash.clone';
import React from 'react';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';
import OptionsList from '../../../options-list';
import {TypesOptionsMap, TypesOptionsDefaultProps} from '../../../../data-types/options-map';

import schemaEntriesStoreFactory from '../../../../client/stores/schema-entries';
import schemaEntriesActionsFactory from '../../../../client/actions/schema-entries';

export default class SchemaEntry extends Component {
  getInitialState () {
    schemaEntriesStoreFactory(this.context.schema.slug);
    this.schemaEntriesActions = schemaEntriesActionsFactory(this.context.schema.slug);
    return {
      schema: this.context.schema,
      schemaEntry: this.context.schemaEntry || {},
      new: !(this.context.schemaEntry && this.context.schemaEntry._id)
    };
  }

  onSubmit (event) {
    event.preventDefault();

    if (this.state.new) {
      this.schemaEntriesActions
        .add(this.state.schemaEntry)
        .then(() => {

        });
    } else {
      this.schemaEntriesActions
        .update(this.state.schemaEntry)
        .then(() => {

        });
    }
  }

  onFieldChange (id, value) {
    this.state.schemaEntry[id] = value;
    this.setState({
      schemaEntry: this.state.schemaEntry
    });
  }

  onChange (values) {
    merge(this.state.schemaEntry, values);
    this.setState({
      schemaEntry: this.state.schemaEntry
    });
  }

  renderProperty (property) {
    // check dependencies
    let show = true;
    if (property.dependencies && property.dependencies.length > 0) {
      forEach(property.dependencies, dependency => {
        if (this.state.schemaEntry[dependency.id] !== dependency.value) {
          show = false;
          return false;
        }
      });
    }

    if (show && TypesOptionsMap[property.type]) {
      let Option = TypesOptionsMap[property.type];
      let props = clone(TypesOptionsDefaultProps[property.type] || {});
      merge(props, property.props || {});

      let value = this.state.schemaEntry[property.id];

      return (
        <div className='option' key={property.id}>
          <div className='label'>
            <span>{property.title}</span>
            {property.required && <span className='sub-label'>*</span>}
          </div>
          <Option onChange={this.onFieldChange.bind(this, property.id)} value={value} {...props} OptionsList={OptionsList} />
        </div>
      );
    }
  }

  renderProperties () {
    if (this.state.schema.properties && this.state.schema.properties.length > 0) {
      return this.state.schema.properties.map(this.renderProperty, this);
    }
  }

  render () {
    return (
      <div className='admin-schema'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='white-options list'>
            <TitleSlug
              title={this.state.schemaEntry.title}
              slug={this.state.schemaEntry.slug}
              validateSlug={this.schemaEntriesActions.validateSlug}
              onChange={this.onChange.bind(this)}
            />
            {this.renderProperties()}
            <div className='button button-primary' onClick={this.onSubmit.bind(this)}>{this.state.new ? 'Publish new entry' : 'Save entry'}</div>
          </div>
        </div>
      </div>
    );
  }
}

SchemaEntry.contextTypes = {
  schema: React.PropTypes.object.isRequired,
  schemaEntry: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired
};
