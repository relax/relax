import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (schemaItem) {
    return (
      <Entry key={schemaItem._id} schema={this.props.schema} schemaItem={schemaItem} />
    );
  }

  render () {
    return (
      <div className='list'>
        {this.props.schemaEntries.map(this.renderEntry, this)}
      </div>
    );
  }
}

List.propTypes = {
  schemaEntries: React.PropTypes.array,
  schema: React.PropTypes.object
};
