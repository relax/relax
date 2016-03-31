import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './properties.less';
import Property from './property';

const singleFixed = [
  {
    id: 'title',
    title: 'Title',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'slug',
    title: 'Slug',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'state',
    title: 'State',
    type: 'String',
    required: true,
    locked: true
  },
  {
    id: 'date',
    title: 'Created Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'updatedDate',
    title: 'Updated Date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'publishedDate',
    title: 'Published date',
    type: 'Date',
    required: true,
    locked: true
  },
  {
    id: 'data',
    title: 'Page builder data',
    type: 'Array',
    required: true,
    locked: true
  }
];

export default class SchemaProperties extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired
  };

  render () {
    const {schema} = this.props;
    return (
      <div className={styles.root}>
        {singleFixed.map(this.renderProperty, this)}
        {schema.properties.map(this.renderProperty, this)}
        <button className={styles.addNew}>Add new property</button>
      </div>
    );
  }

  renderProperty (property) {
    return (
      <Property {...property} key={property.id} />
    );
  }
}
