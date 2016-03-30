import Component from 'components/component';
import React, {PropTypes} from 'react';

import Property from './property';

export default class SchemaProperties extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired
  };

  render () {
    const {schema} = this.props;
    return (
      <div>
        {schema.properties.map(this.renderProperty, this)}
      </div>
    );
  }

  renderProperty (property, key) {
    return (
      <Property {...property} key={key} />
    );
  }
}
