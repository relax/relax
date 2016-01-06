import * as displayActions from '../../client/actions/display';
import * as draftActions from '../../client/actions/draft';
import * as overlaysActions from '../../client/actions/overlays';
import * as pageActions from '../../client/actions/page';
import * as pageBuilderActions from '../../client/actions/page-builder';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import PageActions from '../../components/admin/top-menu/page-actions';
import PageBuild from './page-build';
import RevisionsContainer from './revisions';

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
    ...bindActionCreators(displayActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class PageActionsContainer extends Component {
  static propTypes = {
    draft: PropTypes.object.isRequired,
    draftActions: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    activePanelType: PropTypes.string.isRequired,
    addOverlay: PropTypes.func.isRequired,
    changeDisplay: PropTypes.func.isRequired
  }

  getInitState () {
    this.preventNavigationBind = ::this.preventNavigation;

    if (this.isClient()) {
      window.addEventListener('beforeunload', this.preventNavigationBind);
    }

    return {
      save: false,
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

  expandSave () {
    this.setState({
      save: !this.state.save
    });
  }

  collapseSave () {
    if (this.state.save) {
      this.setState({
        save: false
      });
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

  async saveDraft (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Saving your draft'
    });

    try {
      await this.props.draftActions.saveDraft();
      this.setState({
        state: 'success',
        stateMessage: 'Draft saved successfully'
      });
      this.successTimeout = setTimeout(::this.outSuccess, 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error saving draft'
      });
    }
  }

  async savePage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Saving page'
    });

    try {
      await this.props.pageActions.savePageFromDraft(PageBuild.fragments);
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

  async publishPage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Publishing page'
    });

    try {
      await this.props.pageActions.savePageFromDraft(PageBuild.fragments, true);
      this.setState({
        state: 'success',
        stateMessage: 'Page published successfully'
      });
      this.successTimeout = setTimeout(::this.outSuccess, 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error publishing page'
      });
    }
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
      await this.props.draftActions.dropDraft(PageBuild.fragments, this.props.draft._id._id);
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
      const page = await this.props.pageActions.restorePage(PageBuild.fragments, this.props.page._id, __v);

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

  getCurrentPageProps () {
    const {page} = this.props;

    return {
      _id: {
        _id: page._id,
        __v: page.__v
      },
      date: page.updatedDate,
      user: page.updatedBy,
      title: page.title
    };
  }

  onRevisions () {
    this.props.addOverlay(
      'revisions',
      (
        <RevisionsContainer
          id={this.props.page._id}
          onRestore={::this.onRestore}
          current={this.getCurrentPageProps()}
        />
      )
    );
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
      <PageActions
        {...this.props}
        {...this.state}
        onRevisions={::this.onRevisions}
        previewToggle={::this.previewToggle}
        expandSave={::this.expandSave}
        collapseSave={::this.collapseSave}
        fetchCurrent={::this.fetchCurrent}
        saveDraft={::this.saveDraft}
        hasRevisions={this.hasRevisions()}
        isPublished={this.isPublished()}
        savePage={::this.savePage}
        publishPage={::this.publishPage}
      />
    );
  }
}
