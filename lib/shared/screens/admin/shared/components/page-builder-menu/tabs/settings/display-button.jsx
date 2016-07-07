import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './display-button.less';

export default class DisplayButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  };

  @bind
  onClick () {
    const {onClick, display} = this.props;
    onClick(display);
  }

  render () {
    const {active, icon} = this.props;

    return (
      <button
        className={cx(
          styles.displayButton,
          active && styles.selected
        )}
        onClick={this.onClick}
      >
        <i className={icon} />
      </button>
    );
  }
}
