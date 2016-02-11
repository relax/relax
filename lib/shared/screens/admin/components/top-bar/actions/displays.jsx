import cx from 'classnames';
import React, {PropTypes} from 'react';
import Component from 'components/component';

import styles from './displays.less';

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

  changeDisplay (display) {
    this.props.onChange(display);
  }

  render () {
    const {display, disabled} = this.props;
    const positions = {
      desktop: 0,
      tablet: -25,
      mobile: -50
    };
    const centerMenuStyle = {
      left: positions[display]
    };

    return (
      <div className={cx(styles.root, disabled && styles.disabled)}>
        <div className={styles.wrapper}>
          <div className={styles.slider} style={centerMenuStyle}>
            {Displays.displaysArr.map(this.renderButton, this)}
          </div>
        </div>
      </div>
    );
  }

  renderButton ({display, icon}) {
    return (
      <button
        className={cx(styles.button, this.props.display !== display && styles.unfocus)}
        onClick={this.changeDisplay.bind(this, display)}
        key={display}
      >
        <i className={icon}></i>
      </button>
    );
  }
}
