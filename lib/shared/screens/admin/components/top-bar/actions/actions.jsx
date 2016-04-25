import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './actions.less';
import Back from './back';
import Displays from './displays';
import RightMenu from './right-menu';
import Statuses from './statuses';

export default class Actions extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    draftHasChanges: PropTypes.bool.isRequired,
    state: PropTypes.string,
    stateMessage: PropTypes.string,
    toggleEditing: PropTypes.func.isRequired
  };

  render () {
    const {location} = this.props;
    return (
      <div className={styles.root}>
        {this.renderDisplay()}
        <Back link={location.pathname} />
        {this.renderStatuses()}
        {this.renderRightMenu()}
      </div>
    );
  }

  renderDisplay () {
    const {display, changeDisplay} = this.props;
    return (
      <Displays display={display} onChange={changeDisplay} />
    );
  }

  renderStatuses () {
    const {draftHasChanges, state, stateMessage} = this.props;
    return (
      <Statuses
        draftHasChanges={draftHasChanges}
        state={state}
        stateMessage={stateMessage}
      />
    );
  }

  renderRightMenu () {
    const {toggleEditing} = this.props;
    return (
      <RightMenu toggleEditing={toggleEditing} />
    );
  }
}
