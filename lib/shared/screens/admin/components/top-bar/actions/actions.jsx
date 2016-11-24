import Component from 'components/component';
import Statuses from 'components/statuses';
import Tooltip from 'components/tooltip';
import cx from 'classnames';
import React, {PropTypes} from 'react';

import Back from './back';
import Displays from './displays';
import Tabs from './tabs';
import styles from './actions.less';

export default class Actions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    draftHasChanges: PropTypes.bool.isRequired,
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    toggleEditing: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired
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

  renderDisplay () {
    const {display, changeDisplay, building} = this.props;
    return (
      <Displays
        display={display}
        onChange={changeDisplay}
        disabled={!building}
      />
    );
  }

  renderStatuses () {
    const {draftHasChanges, state, stateMessage, drop} = this.props;
    return (
      <Statuses
        draftHasChanges={draftHasChanges}
        state={state}
        stateMessage={stateMessage}
        drop={drop}
      />
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
