import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Schema extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <div>Schema</div>
    );
  }
}
