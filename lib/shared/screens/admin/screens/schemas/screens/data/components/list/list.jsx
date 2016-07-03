import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
import typesPresentation from 'components/types-presentation';
import Component from 'components/component';
import ContentTable from 'components/content-table';
import Image from 'components/image';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './list.less';

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
    schemaList: PropTypes.array
  };

  render () {
    const {schema, schemaList} = this.props;
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

    switch (this.types[columnProps]) {
      case 'Icon':
        return (
          <div></div>
        );
      case 'Color':
        return (
          <div></div>
        );
      case 'User':
        return (
          <div></div>
        );
      default:
        return item.properties[columnProps];
    }
  }
}
