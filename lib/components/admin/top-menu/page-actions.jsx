import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

import A from '../../a';
import Animate from '../../animate';
import Status from './status';
import RevisionsOverlay from '../revisions-overlay';

import pageActions from '../../../client/actions/page';
import draftActions from '../../../client/actions/draft';
import draftsStore from '../../../client/stores/drafts';

export default class PageActions extends Component {
  getInitialState () {
    return {
      draft: this.context.draft,
      save: false,
      state: null,
      stateMessage: ''
    };
  }

  getInitialModels () {
    var models = {};

    if (this.context.draft) {
      this.currentDraftId = this.context.draft.id;
      models.draft = draftsStore.getModel(this.context.draft.id, {update: false});
    }

    return models;
  }

  componentDidMount () {
    super.componentDidMount();
    this.launchAutosave();
  }

  componentDidUpdate () {
    this.launchAutosave();
    if (this.context.draft && this.context.draft.id !== this.currentDraftId) {
      this.setModels(this.getInitialModels());
    }
  }

  launchAutosave () {
    if (this.context.draft && this.context.page) {
      if (!this.autosaveIntervalId || this.autosaveIntervalId !== this.context.page._id) {
        clearInterval(this.autosaveInterval);
        this.autosaveInterval = setInterval(this.autosave.bind(this), 30000);
      }
    } else {
      clearInterval(this.autosaveInterval);
    }
  }

  onSaveClick (event) {
    event.preventDefault();
    this.setState({
      save: !this.state.save
    });
  }

  onSaveEnter () {
    clearTimeout(this.saveMenuTimeout);
  }

  onSaveLeave () {
    this.saveMenuTimeout = setTimeout(this.saveLeave.bind(this), 600);
  }

  saveLeave () {
    if (this.state.save) {
      this.setState({
        save: false
      });
    }
  }

  autosave () {
    if (this.state.draft) {
      this.setState({
        state: 'loading',
        stateMessage: 'Auto saving draft'
      });

      draftActions
        .update(this.state.draft)
        .then(() => {
          this.setState({
            state: 'success',
            stateMessage: 'Autosave successful'
          });
          this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
        })
        .catch(() => {
          this.setState({
            state: 'error',
            stateMessage: 'Error auto saving draft'
          });
        });
    }
  }

  saveDraft (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Saving your draft'
    });

    draftActions
      .update(this.state.draft)
      .then(() => {
        this.setState({
          state: 'success',
          stateMessage: 'Draft saved successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error saving draft'
        });
      });
  }

  savePage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Saving page'
    });

    this.context.page.data = this.state.draft.data;
    this.context.page.updatedBy = this.context.user._id;

    pageActions
      .update(this.context.page)
      .then((page) => {
        this.state.draft._version = page._version;
        this.state.draft.actions = [];
        this.state.draft.data = page.data;

        return draftActions.update(this.state.draft);
      })
      .then(() => {
        this.setState({
          state: 'success',
          stateMessage: 'Page saved successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error saving page'
        });
      });
  }

  publishPage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Publishing page'
    });

    this.context.page.state = 'published';
    this.context.page.data = this.state.draft.data;
    this.context.page.updatedBy = this.context.user._id;

    pageActions
      .update(this.context.page)
      .then((page) => {
        this.state.draft._version = page._version;
        this.state.draft.actions = [];
        this.state.draft.data = page.data;

        this.setState({
          state: 'success',
          stateMessage: 'Page published successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error publishing page'
        });
      });
  }

  fetchCurrent (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    clearTimeout(this.successTimeout);

    this.setState({
      state: 'loading',
      stateMessage: 'Dropping draft changes'
    });

    this.state.draft._version = this.context.page._version;
    this.state.draft.data = this.context.page.data;
    this.state.draft.actions = [];

    draftActions
      .update(this.state.draft)
      .then(() => {
        this.setState({
          state: 'success',
          stateMessage: 'Draft dropped successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error dropping draft'
        });
      });
  }

  outSuccess () {
    if (this.state.state === 'success') {
      this.setState({
        state: null
      });
    }
  }

  previewToggle (event) {
    event.preventDefault();
    this.context.previewToggle();
  }

  changeDisplay (display, event) {
    event.preventDefault();
    this.context.changeDisplay(display);
  }

  onRestore () {

  }

  onRevisionsClick (event) {
    event.preventDefault();

    const page = this.context.page;
    let current = {
      _id: {
        _id: page._id,
        _version: page._version
      },
      date: page.updatedDate,
      user: page.updatedBy,
      title: page.title
    };

    this.context.addOverlay(
      <RevisionsOverlay current={current} onRestore={this.onRestore.bind(this)} />
    );
  }

  renderDisplayMenu () {
    var positions = {
      desktop: 0,
      tablet: -35,
      mobile: -70
    };
    var centerMenuStyle = {
      left: positions[this.context.display]
    };

    return (
      <div className={cx('center-menu', !this.context.page && 'disabled')}>
        <div className='center-menu-wraper'>
          <div className='center-menu-slider' style={centerMenuStyle}>
            <a href='#' className={this.context.display === 'desktop' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'desktop')}>
              <i className='material-icons'>desktop_mac</i>
            </a>
            <a href='#' className={this.context.display === 'tablet' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'tablet')}>
              <i className='material-icons'>tablet_mac</i>
            </a>
            <a href='#' className={this.context.display === 'mobile' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'mobile')}>
              <i className='material-icons'>phone_iphone</i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  renderRevisions () {
    if (this.context.page && this.context.page._version > 1) {
      return (
        <a href='#' className='top-bar-button' onClick={this.onRevisionsClick.bind(this)}><i className='material-icons'>history</i></a>
      );
    }
  }

  renderSave () {
    if (this.context.activePanelType === 'pageBuild' && this.context.page && this.state.save) {
      return (
        <Animate transition='slideDownIn'>
          <div className='save-menu'>
            <div className='save-action' onClick={this.saveDraft.bind(this)}>
              <i className='material-icons'>mode_edit</i>
              <span>Save my draft</span>
            </div>
            {this.context.page.state === 'published' ?
              <div className='save-action' onClick={this.savePage.bind(this)}>
                <i className='material-icons'>public</i>
                <span>Update</span>
              </div>
              :
              (
                <div>
                  <div className='save-action' onClick={this.savePage.bind(this)}>
                    <i className='material-icons'>save</i>
                    <span>Save</span>
                  </div>
                  <div className='save-action'  onClick={this.publishPage.bind(this)}>
                    <i className='material-icons'>public</i>
                    <span>Save and publish</span>
                  </div>
                </div>
              )
            }
          </div>
        </Animate>
      );
    }
  }

  renderStatus () {
    if (this.context.draft && this.state.draft) {
      return <Status fetchCurrent={this.fetchCurrent.bind(this)} state={this.state.state} stateMessage={this.state.stateMessage} draft={this.state.draft} />;
    }
  }

  render () {
    return (
      <div className='page-actions'>
        {this.renderDisplayMenu()}
        <A href={this.context.lastDashboard} className={cx('top-bar-button', !this.context.page && 'active')}><i className='material-icons'>dashboard</i></A>
        <div className='seperator'></div>
        <div className='statuses'>
          {this.renderStatus()}
        </div>
        <div className={cx('right-menu', this.context.activePanelType !== 'pageBuild' && 'disabled')}>
          {this.renderRevisions()}
          <a href='#' className='top-bar-button'><i className='material-icons'>settings</i></a>
          <a href='#' className='top-bar-button text-button' onClick={this.previewToggle.bind(this)}>Preview</a>
          <a href='#' className='top-bar-button text-button primary save-button' onClick={this.onSaveClick.bind(this)} onMouseLeave={this.onSaveLeave.bind(this)} onMouseEnter={this.onSaveEnter.bind(this)}>
            <span>Save...</span>
            {this.renderSave()}
          </a>
        </div>
      </div>
    );
  }
}

PageActions.contextTypes = {
  draft: React.PropTypes.object,
  page: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  lastDashboard: React.PropTypes.string.isRequired,
  display: React.PropTypes.string.isRequired,
  changeDisplay: React.PropTypes.func.isRequired,
  previewToggle: React.PropTypes.func.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  activePanelType: React.PropTypes.string
};
