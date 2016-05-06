import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './right-menu.less';

export default class RightMenu extends Component {
  static propTypes = {
    toggleEditing: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired
  };

  render () {
    const {toggleEditing, building} = this.props;

    return (
      <div className={cx(styles.root, !building && styles.disabled)}>
        <button className={cx(styles.button, styles.iconButton)}>
          <i className='nc-icon-mini ui-1_settings-gear-64'></i>
        </button>
        <button className={cx(styles.button, styles.textButton)} onClick={toggleEditing}>
          Preview
        </button>
        <button className={cx(styles.button, styles.textButton, styles.primaryButton)}>
          Save
        </button>
      </div>
    );
  }
}
