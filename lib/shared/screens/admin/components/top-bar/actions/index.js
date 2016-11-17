import * as displayActions from 'actions/display';
import Component from 'components/component';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {autosave, drop, save, toggleEditing} from 'actions/page-builder';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Actions from './actions';

// import * as pageActions from 'actions/page';

@connect(
  (state) => ({
    draftID: state.pageBuilder.id,
    display: state.display,
    location: state.router.location,
    draftHasChanges: state.pageBuilder.actions.length > 0,
    draftActionsNumb: state.pageBuilder.actions.length,
    building: !!state.router.location.query.build,
    state: state.pageBuilder.state,
    stateMessage: state.pageBuilder.stateMessage
  }),
  (dispatch) => bindActionCreators({
    ...displayActions,
    drop,
    autosave,
    save,
    toggleEditing
  }, dispatch)
)
export default class ActionsContainer extends Component {
  static propTypes = {
    autosave: PropTypes.func.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
    draftActionsNumb: PropTypes.number.isRequired,
    draftID: PropTypes.string
  };

  componentDidMount () {
    window.addEventListener('beforeunload', this.preventNavigation);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.draftActionsNumb !== this.props.draftActionsNumb &&
        nextProps.draftID === this.props.draftID &&
        nextProps.building) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(this.saveDraft, 2000);
    }
  }

  componentWillUnmount () {
    this.saveDraft();
    window.removeEventListener('beforeunload', this.preventNavigation);
  }

  @bind
  preventNavigation (event) {
    if (this.saveTimeout) {
      const confirmationMessage = 'Your draft has not been saved yet!';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  @bind
  saveDraft () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.props.autosave();
    }
  }

  render () {
    return (
      <Actions
        {...this.props}
      />
    );
  }
}
