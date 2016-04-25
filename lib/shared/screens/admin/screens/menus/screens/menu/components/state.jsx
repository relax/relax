import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './state.less';

export default class MenuState extends Component {
  static propTypes = {
    state: PropTypes.string,
    saveMenu: PropTypes.func.isRequired
  };

  render () {
    const {state, saveMenu} = this.props;
    let result;

    if (state === 'saving') {
      result = (
        <Animate key={state}>
          <Spinner />
        </Animate>
      );
    } else if (state === 'success') {
      result = (
        <Animate key={state}>
          <i className={cx(styles.icon, 'nc-icon-outline ui-1_check-small')} />
        </Animate>
      );
    } else {
      result = (
        <Animate key='normal'>
          <button className={cx(styles.actionButton, styles.save)} onClick={saveMenu}>
            Save Menu
          </button>
        </Animate>
      );
    }

    return result;
  }
}
