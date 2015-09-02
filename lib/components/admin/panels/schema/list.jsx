import React from 'react';
import {Component} from 'relax-framework';
import Entry from './entry';

export default class List extends Component {
  renderEntry (schemaItem) {
    return (
      <Entry key={schemaItem._id} schema={this.context.schema} schemaItem={schemaItem} />
    );
  }

  renderEntries () {
    if (this.props.schemaEntries && this.props.schemaEntries.length > 0) {
      return this.props.schemaEntries.map(this.renderEntry, this);
    } else {
      return (
        <div className='none-warning'>
          <div className='none-icon-part'>
            <i className='material-icons'>error_outline</i>
          </div>
          <div className='none-info-part'>
            <p>No entry created yet on this schema!</p>
            <p>You can add new entries on the add new button above</p>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='list'>
        {this.renderEntries()}
      </div>
    );
  }
}

List.propTypes = {
  schemaEntries: React.PropTypes.array
};

List.contextTypes = {
  schema: React.PropTypes.object.isRequired
};
