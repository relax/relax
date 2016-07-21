import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './list-entry';

export default class LinkingDataList extends Component {
  static fragments = {
    schemas: Entry.fragments.schema
  };

  static propTypes = {
    schemas: PropTypes.array.isRequired
  };

  render () {
    const {schemas} = this.props;

    return (
      <div>
        {schemas.map(this.renderSchema, this)}
      </div>
    );
  }

  renderSchema (schema) {
    return (
      <Entry
        schema={schema}
        key={schema._id}
      />
    );
  }
}
