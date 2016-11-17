import Component from 'components/component';
import Statuses from 'components/statuses';
import React, {PropTypes} from 'react';

import Back from './back';
import Displays from './displays';
import RightMenu from './right-menu';
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
    const {location, building} = this.props;
    return (
      <div className={styles.root}>
        {this.renderDisplay()}
        <Back link={location.pathname} />
        {building && this.renderStatuses()}
        {this.renderRightMenu()}
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

  renderRightMenu () {
    const {toggleEditing, building, save} = this.props;
    return (
      <RightMenu
        toggleEditing={toggleEditing}
        save={save}
        building={building}
      />
    );
  }
}
