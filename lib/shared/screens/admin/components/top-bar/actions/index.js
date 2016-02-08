import * as displayActions from 'actions/display';
import * as draftActions from 'actions/draft';
import * as pageActions from 'actions/page';
import * as pageBuilderActions from 'actions/page-builder';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Actions from './actions';

@connect(
  (state) => ({
    draft: state.draft.data,
    display: state.display,
    page: state.page.data
  }),
  (dispatch) => ({
    draftActions: bindActionCreators(draftActions, dispatch),
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(displayActions, dispatch)
  })
)
export default class ActionsContainer extends Component {
  static propTypes = {
    draft: PropTypes.object.isRequired,
    draftActions: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    activePanelType: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired
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
    if (nextProps.draft._id !== this.props.draft._id) {
      this.save();
    } else if (nextProps.draft.actions !== this.props.draft.actions) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(::this.autosave, 2000);
    }
  }

  componentWillUnmount () {
    this.save();
    window.removeEventListener('beforeunload', this.preventNavigationBind);
  }

  preventNavigation (event) {
    if (this.saveTimeout) {
      const confirmationMessage = 'Your draft has not been saved yet!';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  save () {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;
      this.props.draftActions.saveDraft(this.props.draft);
    }
  }

  async autosave () {
    if (this.props.draft) {
      this.setState({
        state: 'loading',
        stateMessage: 'Auto saving draft'
      });
      clearTimeout(this.saveTimeout);
      this.saveTimeout = false;

      try {
        await this.props.draftActions.saveDraft();
        this.setState({
          state: 'success',
          stateMessage: 'Autosave successful'
        });
        this.successTimeout = setTimeout(::this.outSuccess, 2000);
      } catch (err) {
        this.setState({
          state: 'error',
          stateMessage: 'Error auto saving draft'
        });
      }
    }
  }

  async savePage (event, publish = false) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Saving page'
    });

    try {
      await this.props.pageActions.savePageFromDraft(publish);
      this.setState({
        state: 'success',
        stateMessage: 'Page saved successfully'
      });
      this.successTimeout = setTimeout(::this.outSuccess, 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error saving page'
      });
    }
  }

  publishPage (event) {
    this.savePage(event, true);
  }

  async fetchCurrent (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Dropping draft changes'
    });

    try {
      await this.props.draftActions.dropDraft(this.props.draft._id._id);
      this.setState({
        state: 'success',
        stateMessage: 'Draft dropped successfully'
      });
      this.successTimeout = setTimeout(::this.outSuccess, 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error dropping draft'
      });
    }
  }

  async onRestore (__v) {
    this.setState({
      state: 'loading',
      stateMessage: 'Restoring revisions'
    });

    try {
      const page = await this.props.pageActions.restorePage(this.props.page._id, __v);

      this.setState({
        state: 'success',
        stateMessage: 'Revisions restored successfully'
      });

      history.pushState({}, '', `/admin/page/${page.restorePage._id}`);
      this.successTimeout = setTimeout(::this.outSuccess, 3000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error restoring revisions'
      });
    }
  }

  outSuccess () {
    if (this.state.state === 'success') {
      this.setState({
        state: null
      });
    }
  }

  previewToggle () {
    this.props.pageBuilderActions.toggleEditing();
  }

  hasRevisions () {
    return this.props.page && this.props.page.__v > 0;
  }

  isPublished () {
    return this.props.page && this.props.page.state === 'published';
  }

  render () {
    return (
      <Actions
        {...this.props}
        {...this.state}
        previewToggle={::this.previewToggle}
        fetchCurrent={::this.fetchCurrent}
        hasRevisions={this.hasRevisions()}
        isPublished={this.isPublished()}
        savePage={::this.savePage}
        publishPage={::this.publishPage}
      />
    );
  }
}
