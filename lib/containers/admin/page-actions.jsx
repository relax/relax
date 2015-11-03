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

  static contextTypes = {
    store: PropTypes.object
  }

  getInitialState () {
    return {
      save: false,
      state: null,
      stateMessage: ''
    };
  }

  componentDidMount () {
    this.launchAutosave();
  }

  componentDidUpdate () {
    this.launchAutosave();
  }

  launchAutosave () {
    if (this.props.draft && this.props.activePanelType === 'pageBuild') {
      clearInterval(this.autosaveInterval);
      this.autosaveInterval = setInterval(::this.autosave, 30000);
    } else if (this.autosaveInterval) {
      clearInterval(this.autosaveInterval);
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

  async autosave () {
    if (this.props.draft) {
      this.setState({
        state: 'loading',
        stateMessage: 'Auto saving draft'
      });

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
          store={this.context.store}
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
