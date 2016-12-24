import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class BooleanPresentation extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  render () {
    const {value} = this.props;
    return (
      <div>{value ? 'true' : 'false'}</div>
    );
  }
}
