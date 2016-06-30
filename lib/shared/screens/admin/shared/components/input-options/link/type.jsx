import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './type.less';

export default class LinkType extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    white: PropTypes.bool
  };

  @bind
  onClick () {
    const {onClick, type} = this.props;
    onClick(type);
  }

  render () {
    const {icon, active, white} = this.props;
    return (
      <div
        className={cx(styles.root, active && styles.active, white && styles.white)}
        onClick={this.onClick}
      >
        <i className={icon} />
      </div>
    );
  }
}
