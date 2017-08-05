import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import ContentTable from 'components/content-table';
import Scrollable from 'components/scrollable';
import bind from 'decorators/bind';
import forEach from 'lodash/forEach';
import styles from './list.less';
import typesPresentation from 'components/types-presentation';

export default class DataSchemaList extends Component {
  static fragments = {
    schema: {
      _id: 1,
      properties: 1
    },
    schemaList: {
      _id: 1,
      properties: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaList: PropTypes.array,
    onEntryClick: PropTypes.func.isRequired
  };

  render () {
    const {schema, schemaList, onEntryClick} = this.props;
    const labels = [];
    const props = [];
    this.types = {};

    forEach(schema.properties, (property) => {
      labels.push(property.title);
      props.push(property.id);
      this.types[property.id] = property.type;
    });

    return (
      <Scrollable className={styles.root}>
        <ContentTable
          columns={labels}
          columnsProps={props}
          data={schemaList || []}
          renderCell={this.renderCell}
          onRowClick={onEntryClick}
        />
      </Scrollable>
    );
  }

  @bind
  renderCell ({item, columnProps}) {
    const type = this.types[columnProps];
    let result;

    if (typesPresentation[type]) {
      const Tag = typesPresentation[type];
      result = (
        <Tag value={item.properties[columnProps]} />
      );
    } else {
      result = item.properties[columnProps];
    }

    return result;
  }
}
