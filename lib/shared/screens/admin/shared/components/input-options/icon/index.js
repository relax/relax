import Component from 'components/component';
import React, {PropTypes} from 'react';

import IconPicker from './icon-picker';

export default class IconPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      selector: false
    };
  }

  openSelector () {
    this.setState({
      selector: true
    });
  }

  closeSelector () {
    this.setState({
      selector: false
    });
  }

  render () {
    return (
      <IconPicker
        {...this.props}
        {...this.state}
        openSelector={::this.openSelector}
        closeSelector={::this.closeSelector}
      />
    );
  }
}
