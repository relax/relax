import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './tab-button.less';

export default class TabButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool
  };

  @bind
  onClick () {
    const {onClick, id} = this.props;
    onClick(id);
  }

  render () {
    const {title, active} = this.props;
    return (
      <button
        className={cx(styles.tab, active && styles.active)}
        onClick={this.onClick}
      >
        {title}
      </button>
    );
  }
}
