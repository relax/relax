import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import Display from './display';

export default class Displays extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProp = {
    disabled: false
  };

  static displaysArr = [
    {
      display: 'desktop',
      icon: 'nc-icon-mini tech_desktop-screen'
    },
    {
      display: 'tablet',
      icon: 'nc-icon-mini tech_tablet-button'
    },
    {
      display: 'mobile',
      icon: 'nc-icon-mini tech_mobile-button'
    }
  ];

  render () {
    return (
      <div>
        {Displays.displaysArr.map(this.renderButton, this)}
      </div>
    );
  }

  renderButton (button) {
    const {display, onChange} = this.props;

    return (
      <Display
        onChange={onChange}
        icon={button.icon}
        display={button.display}
        active={display === button.display}
        key={button.display}
      />
    );
  }
}
