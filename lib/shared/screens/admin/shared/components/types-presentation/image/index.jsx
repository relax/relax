import Component from 'components/component';
import Image from 'components/image';
import React, {PropTypes} from 'react';

export default class ImagePresentation extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };

  render () {
    const {value} = this.props;
    return (
      <Image
        id={value}
        width={80}
        height={80}
      />
    );
  }
}
