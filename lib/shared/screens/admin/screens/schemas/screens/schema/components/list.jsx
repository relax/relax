import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class SchemaEntriesList extends Component {
  static fragments = {
    schemaList: Entry.fragments.schemaEntry
  };

  static propTypes = {
    schemaList: PropTypes.array.isRequired,
    activeSchemaEntryId: PropTypes.string,
    query: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        {this.props.schemaList.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (schemaEntry, key) {
    const {activeSchemaEntryId, query} = this.props;
    return (
      <Entry
        schemaEntry={schemaEntry}
        key={key}
        active={activeSchemaEntryId === schemaEntry._id}
        query={query}
      />
    );
  }
}
