import Component from 'components/component';
import Tooltip from 'components/tooltip';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Back from './back';
import Displays from './displays';
import Tabs from './tabs';
import styles from './actions.less';

export default class Actions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired
  };

  render () {
    const {location} = this.props;

    return (
      <div className={styles.root}>
        <Back link={location.pathname} />
        {this.renderActions()}
        <Tabs />
      </div>
    );
  }

  renderActions () {
    const {display, changeDisplay, toggleEditing, building} = this.props;

    return (
      <div className={cx(styles.actions, !building && styles.disabled)}>
        <div className={styles.section}>
          <Displays
            display={display}
            onChange={changeDisplay}
            disabled={!building}
          />
        </div>
        <div className={styles.section}>
          <Tooltip label='Preview'>
            <button className={styles.button} onClick={toggleEditing}>
              <i className='nc-icon-mini ui-1_eye-19' />
            </button>
          </Tooltip>
        </div>
        <div className={styles.section}>
          <Tooltip label='Settings'>
            <button className={styles.button}>
              <i className='nc-icon-mini ui-1_settings-gear-64' />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}
