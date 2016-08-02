import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './list-entry';

const page = {
  _id: 'page',
  title: 'Page'
};

export default class LinkingDataList extends Component {
  static fragments = {
    schemas: Entry.fragments.schema
  };

  static propTypes = {
    schemas: PropTypes.array.isRequired,
    changeSchema: PropTypes.func.isRequired
  };

  render () {
    const {schemas} = this.props;

    return (
      <div>
        {this.renderSchema(page)}
        {schemas.map(this.renderSchema, this)}
      </div>
    );
  }

  renderSchema (schema) {
    const {changeSchema} = this.props;

    return (
      <Entry
        schema={schema}
        changeSchema={changeSchema}
        key={schema._id}
      />
    );
  }
}
