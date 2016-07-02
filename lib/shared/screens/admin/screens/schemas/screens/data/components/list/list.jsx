import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
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
    switch (this.types[columnProps]) {
      case 'Image':
        return (
          <Image
            id={item.properties[columnProps]}
            width={80}
            height={80}
          />
        );
      case 'Boolean':
        return item.properties[columnProps] ? 'true' : 'false';
      case 'Html':
        return (
          <div dangerouslySetInnerHTML={{__html: item.properties[columnProps]}} />
        );
      default:
        return item.properties[columnProps];
    }
  }
}
