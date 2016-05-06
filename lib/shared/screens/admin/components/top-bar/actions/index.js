import * as displayActions from 'actions/display';
import * as draftActions from 'actions/draft';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {toggleEditing} from 'actions/page-builder';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Actions from './actions';

// import * as pageActions from 'actions/page';

@dataConnect(
  (state) => ({
    draftID: state.router.params.id,
    display: state.display,
    location: state.router.location,
    draftHasChanges: state.pageBuilder.actions.length > 0,
    draftActionsNumb: state.pageBuilder.actions.length,
    building: state.router.location.query.build
  }),
  (dispatch) => bindActionCreators({
    ...displayActions,
    ...draftActions,
    toggleEditing
  }, dispatch),
  (props) => {
    let result = {};

    if (props.draftID) {
      result = {
        fragments: {
          draft: {
            _id: {
              _id: 1,
              _userId: 1
            },
            __v: 1
          }
        },
        variablesTypes: {
          draft: {
            id: 'ID!'
          }
        },
        initialVariables: {
          draft: {
            id: props.draftID
          }
        }
      };
    }

    return result;
  }
)
export default class ActionsContainer extends Component {
  static propTypes = {
    saveDraft: PropTypes.object.isRequired,
    dropDraft: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    activePanelType: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    draftActionsNumb: PropTypes.number.isRequired,
    draftID: PropTypes.string
  };

  getInitState () {
    this.preventNavigationBind = ::this.preventNavigation;

    if (this.isClient()) {
      window.addEventListener('beforeunload', this.preventNavigationBind);
    }

    return {
      state: null,
      stateMessage: ''
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.draftActionsNumb !== this.props.draftActionsNumb &&
        nextProps.draftID === this.props.draftID &&
        nextProps.building) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(this.autosave, 2000);
    }
  }

  componentWillUnmount () {
    this.saveDraft();
    window.removeEventListener('beforeunload', this.preventNavigationBind);
  }

  preventNavigation (event) {
    if (this.saveTimeout) {
      const confirmationMessage = 'Your draft has not been saved yet!';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  saveDraft () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.props.saveDraft();
    }
  }

  @bind
  async autosave () {
    if (this.props.draftID) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.setState({
        state: 'loading',
        stateMessage: 'Auto saving draft'
      });

      try {
        await this.props.saveDraft();
        this.setState({
          state: 'success',
          stateMessage: 'Autosave successful'
        });
        this.successTimeout = setTimeout(this.outSuccess, 2000);
      } catch (err) {
        this.setState({
          state: 'error',
          stateMessage: 'Error auto saving draft'
        });
      }
    }
  }

  async savePage () {
    clearTimeout(this.successTimeout);
    this.saveTimeout = false;
    this.setState({
      state: 'loading',
      stateMessage: 'Saving page'
    });

    try {
      await this.props.pageActions.savePageFromDraft();
      this.setState({
        state: 'success',
        stateMessage: 'Page saved successfully'
      });
      this.successTimeout = setTimeout(this.outSuccess, 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error saving page'
      });
    }
  }

  // async fetchCurrent (event) {
  //   if (event && event.preventDefault) {
  //     event.preventDefault();
  //   }
  //   clearTimeout(this.successTimeout);
  //
  //   this.setState({
  //     state: 'loading',
  //     stateMessage: 'Dropping draft changes'
  //   });
  //
  //   try {
  //     await this.props.draftActions.dropDraft(this.props.draft._id._id);
  //     this.setState({
  //       state: 'success',
  //       stateMessage: 'Draft dropped successfully'
  //     });
  //     this.successTimeout = setTimeout(::this.outSuccess, 2000);
  //   } catch (err) {
  //     this.setState({
  //       state: 'error',
  //       stateMessage: 'Error dropping draft'
  //     });
  //   }
  // }

  // async onRestore (__v) {
  //   this.setState({
  //     state: 'loading',
  //     stateMessage: 'Restoring revisions'
  //   });
  //
  //   try {
  //     const page = await this.props.pageActions.restorePage(this.props.page._id, __v);
  //
  //     this.setState({
  //       state: 'success',
  //       stateMessage: 'Revisions restored successfully'
  //     });
  //
  //     history.pushState({}, '', `/admin/page/${page.restorePage._id}`);
  //     this.successTimeout = setTimeout(::this.outSuccess, 3000);
  //   } catch (err) {
  //     this.setState({
  //       state: 'error',
  //       stateMessage: 'Error restoring revisions'
  //     });
  //   }
  // }

  @bind
  outSuccess () {
    if (this.state.state === 'success') {
      this.setState({
        state: null
      });
    }
  }

  render () {
    return (
      <Actions
        {...this.props}
        {...this.state}
      />
    );
  }
}
