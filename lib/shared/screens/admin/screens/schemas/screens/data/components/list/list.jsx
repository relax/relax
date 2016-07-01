import Component from 'components/component';
import React, {PropTypes} from 'react';

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
    return (
      <div>
        List
      </div>
    );
  }
}
