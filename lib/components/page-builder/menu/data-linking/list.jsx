import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    schemas: Entry.fragments.schema
  }

  static propTypes = {
    schemas: PropTypes.array.isRequired,
    changeSchema: PropTypes.func.isRequired,
    selectedSchema: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        {this.props.schemas.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (schema) {
    if (!this.props.selectedSchema || schema._id !== this.props.selectedSchema._id) {
      return (
        <Entry
          key={schema._id}
          schema={schema}
          changeSchema={this.props.changeSchema}
        />
      );
    }
  }
}
