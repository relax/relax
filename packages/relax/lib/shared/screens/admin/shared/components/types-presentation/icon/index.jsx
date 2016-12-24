import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class IconPresentation extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  render () {
    const {value} = this.props;
    let result;

    if (value) {
      result = (
        <i className={value.className}>{value.content}</i>
      );
    } else {
      result = (
        <div>-</div>
      );
    }

    return result;
  }
}
