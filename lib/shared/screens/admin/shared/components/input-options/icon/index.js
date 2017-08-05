import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';

import IconPicker from './icon-picker';

export default class IconPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      selector: false
    };
  }

  @bind
  openSelector () {
    this.setState({
      selector: true
    });
  }

  @bind
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
        openSelector={this.openSelector}
        closeSelector={this.closeSelector}
      />
    );
  }
}
