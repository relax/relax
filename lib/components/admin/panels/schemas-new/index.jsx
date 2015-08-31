import Builder from './builder';
import {Component} from 'relax-framework';
import React from 'react';
import TitleSlug from '../../../title-slug';
import Breadcrumbs from '../../../breadcrumbs';

import schemaActions from '../../../../client/actions/schema';

export default class SchemasNew extends Component {
  getInitialState () {
    return {
      schema: [],
      title: '',
      slug: ''
    };
  }

  onAddNew (event) {
    event.preventDefault();

    schemaActions
      .add({
        title: this.state.title,
        slug: this.state.slug,
        fields: this.state.schema
      })
      .then(() => {
        this.setState({
          title: '',
          slug: '',
          hasTypedSlug: false
        });
      });
  }

  onSchemaChange (schema) {
    this.setState({
      schema
    });
  }

  onChange (values) {
    this.setState(values);
  }

  render () {
    return (
      <div className='admin-schemas-new'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <form className='list white-options' onSubmit={this.onAddNew.bind(this)}>
            <TitleSlug title={this.state.title} slug={this.state.slug} validateSlug={schemaActions.validateSlug} onChange={this.onChange.bind(this)} />
            <Builder onChange={this.onSchemaChange.bind(this)} />
            <div className='button button-primary'>Save schema</div>
          </form>
        </div>
      </div>
    );
  }
}

SchemasNew.contextTypes = {
  breadcrumbs: React.PropTypes.array.isRequired
};
