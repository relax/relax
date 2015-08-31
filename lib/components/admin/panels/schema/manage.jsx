import React from 'react';
import {Component} from 'relax-framework';
import merge from 'lodash.merge';
import OptionsList from '../../../options-list';
import TitleSlug from '../../../title-slug';

import schemaEntriesActionsFactory from '../../../../client/actions/schema-entries';

export default class Manage extends Component {
  getInitialState () {
    return {
      title: '',
      slug: '',
      values: {}
    };
  }

  onSubmit (event) {
    event.preventDefault();

    schemaEntriesActionsFactory(this.props.schema.slug)
      .add(merge(
        {
          title: this.state.title,
          slug: this.state.slug
        },
        this.state.values
      ))
      .then(() => {
        this.setState({
          title: '',
          slug: '',
          values: {}
        });
      });
  }

  onChange (values) {
    this.setState(values);
  }

  onFieldChange (id, value) {
    this.state.values[id] = value;
    this.setState({
      values: this.state.values
    });
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <TitleSlug
          title={this.state.title}
          slug={this.state.slug}
          validateSlug={schemaEntriesActionsFactory(this.props.schema.slug).validateSlug}
          onChange={this.onChange.bind(this)}
        />
        <OptionsList options={this.props.schema.fields} values={this.state.values} onChange={this.onFieldChange.bind(this)} />
        <input type='submit' value='Add entry' />
      </form>
    );
  }
}

Manage.propTypes = {
  schema: React.PropTypes.object.isRequired
};
