import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import ContentTable from 'components/content-table';
import React, {PropTypes} from 'react';

import styles from './list.less';

export default class DataSchemaList extends Component {
  static fragments = {
    schema: {
      _id: 1,
      properties: 1
    }
  };

  static propTypes = {
    schema: PropTypes.object.isRequired
  };

  render () {
    const {schema} = this.props;
    const labels = [];
    const props = [];

    forEach(schema.properties, (property) => {
      labels.push(property.title);
      props.push(property.id);
    });

    return (
      <div className={styles.root}>
        <ContentTable
          columns={labels}
          columnsProps={props}
          data={[]}
          renderCell={this.renderCell}
        />
      </div>
    );
  }

  @bind
  renderCell ({item, columnProps}) {
    return item[columnProps];
  }
}
