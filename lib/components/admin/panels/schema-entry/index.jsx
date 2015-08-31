import {Component} from 'relax-framework';
import merge from 'lodash.merge';
import OptionsList from '../../../options-list';
import React from 'react';
import Breadcrumbs from '../../../breadcrumbs';
import TitleSlug from '../../../title-slug';

import schemaEntriesActionsFactory from '../../../../client/actions/schema-entries';

export default class SchemaEntry extends Component {
  getInitialState () {
    this.schemaEntriesActions = schemaEntriesActionsFactory(this.context.schema.slug);
    return {
      opened: false,
      schema: this.context.schema,
      schemaEntry: this.context.schemaEntry
    };
  }

  onSubmit (event) {
    event.preventDefault();

    this.schemaEntriesActions
      .update(this.state.schemaEntry)
      .then(() => {

      });
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

  render () {
    return (
      <div className='admin-schema'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <form className='list' onSubmit={this.onSubmit.bind(this)}>
            <TitleSlug
              title={this.state.schemaEntry.title}
              slug={this.state.schemaEntry.slug}
              validateSlug={this.schemaEntriesActions.validateSlug}
              onChange={this.onChange.bind(this)}
            />
            <OptionsList options={this.state.schema.fields} values={this.state.schemaEntry} onChange={this.onFieldChange.bind(this)} />
            <input type='submit' value='Change' />
          </form>
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
