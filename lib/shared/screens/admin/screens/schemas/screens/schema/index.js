import Component from 'components/component';
import React, {PropTypes} from 'react';

import Schema from './components/schema';

export default class SchemaContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <Schema>
        {this.props.children}
      </Schema>
    );
  }
}
