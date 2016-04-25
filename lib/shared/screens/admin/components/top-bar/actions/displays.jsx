import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './displays.less';
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
    const {onChange} = this.props;
    return (
      <Display
        onChange={onChange}
        icon={icon}
        display={display}
        active={this.props.display === display}
        key={display}
      />
    );
  }
}
