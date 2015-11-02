import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../a';
import Animate from '../../animate';
import PageBuild from '../panels/page-build';
import RevisionsContainer from '../../../containers/admin/revisions';
import Status from './status';

export default class PageActions extends Component {
  static propTypes = {
    draft: PropTypes.object,
    draftActions: PropTypes.object,
    page: PropTypes.object,
    schema: PropTypes.object,
    schemaEntry: PropTypes.object,
    user: PropTypes.object.isRequired,
    lastDashboard: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    pageActions: PropTypes.object.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    activePanelType: PropTypes.string
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
      this.autosaveInterval = setInterval(this.autosave.bind(this), 30000);
    } else if (this.autosaveInterval) {
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
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
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
      this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
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
      this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
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
      this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
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
      this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    } catch (err) {
      this.setState({
        state: 'error',
        stateMessage: 'Error dropping draft'
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

  previewToggle (event) {
    event.preventDefault();
    this.props.pageBuilderActions.toggleEditing();
  }

  changeDisplay (display, event) {
    event.preventDefault();
    this.props.changeDisplay(display);
  }

  async onRestore (__v) {
    this.props.closeOverlay();

    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    try {
      await this.props.pageActions.restore({
        _id: this.props.page._id,
        __v
      });
      this.setState({
        state: 'success',
        stateMessage: 'Page revision restored'
      });
      this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    } catch (err) {
      this.setState({
        success: false
      });
    }
  }

  onRevisionsClick (event) {
    event.preventDefault();
    this.props.addOverlay(
      'revisions',
      RevisionsContainer
    );
  }

  render () {
    return (
      <div className='page-actions'>
        {this.renderDisplayMenu()}
        <A href={this.props.lastDashboard} className={cx('dashboard-button', this.props.activePanelType !== 'pageBuild' && 'active')}>
          <img src='/images/admin/logo@2x.png' className='logo' />
          <img src='/images/admin/relax@2x.png' className='lettering' />
        </A>
        <div className='statuses'>
          {this.renderStatus()}
        </div>
        <div className={cx('right-menu', this.props.activePanelType !== 'pageBuild' && 'disabled')}>
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

  renderStatus () {
    if (this.props.draft && this.props.activePanelType === 'pageBuild') {
      return (
        <Status
          fetchCurrent={this.fetchCurrent.bind(this)}
          state={this.state.state}
          stateMessage={this.state.stateMessage}
          draft={this.props.draft}
          currentVersion={this.props.page.__v}
        />
      );
    }
  }

  renderSave () {
    if (this.props.activePanelType === 'pageBuild' && this.state.save) {
      return (
        <Animate transition='slideDownIn'>
          <div className='save-menu'>
            <div className='save-action' onClick={this.saveDraft.bind(this)}>
              <i className='material-icons'>mode_edit</i>
              <span>Save my draft</span>
            </div>
            {this.renderSaveMethods()}
          </div>
        </Animate>
      );
    }
  }

  renderDisplayMenu () {
    const positions = {
      desktop: 0,
      tablet: -25,
      mobile: -50
    };
    const centerMenuStyle = {
      left: positions[this.props.display]
    };

    return (
      <div className={cx('center-menu', this.props.activePanelType !== 'pageBuild' && 'disabled')}>
        <div className='center-menu-wraper'>
          <div className='center-menu-slider' style={centerMenuStyle}>
            <a href='#' className={this.props.display === 'desktop' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'desktop')}>
              <i className='material-icons'>computer</i>
            </a>
            <a href='#' className={this.props.display === 'tablet' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'tablet')}>
              <i className='material-icons'>tablet_mac</i>
            </a>
            <a href='#' className={this.props.display === 'mobile' ? 'top-bar-button' : 'top-bar-button unfocus'} onClick={this.changeDisplay.bind(this, 'mobile')}>
              <i className='material-icons'>phone_iphone</i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  renderRevisions () {
    const hasRevisions = (this.props.page && this.props.page.__v > 0) || (this.props.schema && this.props.schema.__v > 0);

    if (this.props.activePanelType === 'pageBuild' && hasRevisions) {
      return (
        <a href='#' className='top-bar-button' onClick={this.onRevisionsClick.bind(this)}><i className='material-icons'>history</i></a>
      );
    }
  }

  renderSaveMethods () {
    let result;
    if ((this.props.schema && !this.props.schemaEntry) ||
        (this.props.page && this.props.page.state === 'published') ||
        (this.props.schemaEntry && this.props.schemaEntry._state === 'published')) {
      result = (
        <div className='save-action' onClick={this.savePage.bind(this)}>
          <i className='material-icons'>public</i>
          <span>Update</span>
        </div>
      );
    } else {
      result = (
        <div>
          <div className='save-action' onClick={this.savePage.bind(this)}>
            <i className='material-icons'>save</i>
            <span>Save</span>
          </div>
          <div className='save-action' onClick={this.publishPage.bind(this)}>
            <i className='material-icons'>public</i>
            <span>Save and publish</span>
          </div>
        </div>
      );
    }
    return result;
  }
}
