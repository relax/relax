import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

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
    changeSchema: PropTypes.func.isRequired,
    goal: PropTypes.string.isRequired
  };

  render () {
    const {schemas, goal} = this.props;

    return (
      <div>
        {goal === 'read' && this.renderSchema(page)}
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
