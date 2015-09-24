import React from 'react';
import {Component, Router} from 'relax-framework';
import cx from 'classnames';
import Q from 'q';
import cloneDeep from 'lodash.clonedeep';

import A from '../../a';
import Animate from '../../animate';
import Status from './status';
import RevisionsOverlay from '../revisions-overlay';

import pageActions from '../../../client/actions/page';
import schemaActions from '../../../client/actions/schema';
import schemaEntriesActionsFactory from '../../../client/actions/schema-entries';
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
    if (this.context.draft && this.context.activePanelType === 'pageBuild') {
      clearInterval(this.autosaveInterval);
      this.autosaveInterval = setInterval(this.autosave.bind(this), 30000);
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

    let actions, clone, label;
    if (this.context.page) {
      actions = pageActions;
      clone = cloneDeep(this.context.page);
      clone.data = this.state.draft.data;
      clone.updatedBy = this.context.user._id;
      label = 'Page';
      this.setState({
        state: 'loading',
        stateMessage: 'Saving page'
      });
    } else if (this.context.schemaEntry) {
      actions = schemaEntriesActionsFactory(this.context.schema.slug);
      clone = cloneDeep(this.context.schemaEntry);
      label = this.context.schemaEntry._title;
      clone._data = this.state.draft.data;
      clone._schemaLinks = this.state.draft.schemaLinks;
      clone._updatedBy = this.context.user._id;
      this.setState({
        state: 'loading',
        stateMessage: 'Saving '+this.context.schemaEntry._title
      });
    } else if (this.context.schema) {
      actions = schemaActions;
      clone = cloneDeep(this.context.schema);
      clone.data = this.state.draft.data;
      clone.schemaLinks = this.state.draft.schemaLinks;
      clone.updatedBy = this.context.user._id;
      label = 'Schema template';
      this.setState({
        state: 'loading',
        stateMessage: 'Saving schema template'
      });
    } else {
      this.setState({
        state: 'error',
        stateMessage: 'Something went wrong'
      });
      return;
    }

    actions
      .update(clone)
      .then((result) => {
        let draftClone = cloneDeep(this.state.draft);

        draftClone.__v = result.__v;
        draftClone.actions = [];
        draftClone.data = result._data || result.data;

        return draftActions.update(draftClone);
      })
      .then(() => {
        this.setState({
          state: 'success',
          stateMessage: label+' saved successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error occurred while saving'
        });
      });
  }

  publishPage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    // Publish only for pages and schema entries
    if (!this.context.page && !this.context.schemaEntry) {
      return;
    }

    let clone, actions;

    if (this.context.page) {
      this.setState({
        state: 'loading',
        stateMessage: 'Publishing page'
      });
      actions = pageActions;
      clone = cloneDeep(this.context.page);
      clone.state = 'published';
      clone.data = this.state.draft.data;
      clone.updatedBy = this.context.user._id;
    } else if (this.context.schemaEntry) {
      this.setState({
        state: 'loading',
        stateMessage: 'Publishing '+this.context.schemaEntry._title
      });
      actions = schemaEntriesActionsFactory(this.context.schema.slug);
      clone = cloneDeep(this.context.schemaEntry);
      clone._state = 'published';
      clone._data = this.state.draft.data;
      clone._schemaLinks = this.state.draft.schemaLinks;
      clone._updatedBy = this.context.user._id;
    }


    actions
      .update(clone)
      .then((result) => {
        let draftClone = cloneDeep(this.state.draft);

        draftClone.actions = [];
        draftClone.data = result._data || result.data;
        draftClone.__v = result.__v;

        return draftActions.update(draftClone);
      })
      .then((draft) => {
        this.setState({
          state: 'success',
          stateMessage: 'Published successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
      })
      .catch(() => {
        this.setState({
          state: 'error',
          stateMessage: 'Error publishing'
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

    let current;
    if (this.context.page) {
      current = this.context.page;
    } else if (this.context.schemaEntry) {
      current = this.context.schemaEntry;
    } else if (this.context.schema) {
      current = this.context.schema;
    } else {
      this.setState({
        state: 'error',
        stateMessage: 'Something went wrong'
      });
      return;
    }

    let draftClone = cloneDeep(this.state.draft);
    draftClone.__v = current.__v;
    draftClone.data = current._data || current.data;
    draftClone.actions = [];

    if (current.schemaLinks || current._schemaLinks) {
      draftClone.schemaLinks = current._schemaLinks || current.schemaLinks;
    }

    draftActions
      .update(draftClone)
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

  onRestore (__v) {
    this.context.closeOverlay();

    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    let actions, current;
    if (this.context.page) {
      actions = pageActions;
      current = this.context.page;
    } else if (this.context.schemaEntry) {
      actions = schemaEntriesActionsFactory(this.context.schema.slug);
      current = this.context.schemaEntry;
    } else if (this.context.schema) {
      actions = schemaActions;
      current = this.context.schema;
    } else {
      this.setState({
        state: 'error',
        stateMessage: 'Something went wrong'
      });
      return;
    }

    actions
      .restore({
        _id: current._id,
        __v
      })
      .then((result) => {
        let draftClone = cloneDeep(this.state.draft);

        draftClone.actions = [];
        draftClone.data = result._data || result.data;
        draftClone.__v = result.__v;

        if (result.schemaLinks || result._schemaLinks) {
          draftClone.schemaLinks = result._schemaLinks || result.schemaLinks;
        }

        return Q.all([result, draftActions.update(draftClone)]);
      })
      .spread((result, draft) => {
        this.setState({
          state: 'success',
          stateMessage: 'Revision restored successfully'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);

        if (this.context.page) {
          Router.prototype.navigate('/admin/page/'+result.slug, {trigger: false, replace: true});
        } else if (this.context.schemaEntry) {
          Router.prototype.navigate('/admin/schema/'+this.context.schema.slug+'/'+result._slug+'/single', {trigger: false, replace: true});
        } else if (this.context.schema) {
          Router.prototype.navigate('/admin/schemas/'+result.slug+'/template', {trigger: false, replace: true});
        }
      })
      .catch(() => {
        this.setState({
          success: false,
          stateMessage: 'Error restoring revision'
        });
      });
  }

  onRevisionsClick (event) {
    event.preventDefault();

    let page;
    if (this.context.page) {
      page = this.context.page;
    } else if (this.context.schema) {
      page = this.context.schema;
    } else {
      this.setState({
        state: 'error',
        stateMessage: 'Something went wrong'
      });
      return;
    }

    let current = {
      _id: {
        _id: page._id,
        __v: page.__v
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
      <div className={cx('center-menu', this.context.activePanelType !== 'pageBuild' && 'disabled')}>
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
    let hasRevisions = (this.context.page && this.context.page.__v > 0) || (this.context.schema && this.context.schema.__v > 0);

    if (this.context.activePanelType === 'pageBuild' && hasRevisions) {
      return (
        <a href='#' className='top-bar-button' onClick={this.onRevisionsClick.bind(this)}><i className='material-icons'>history</i></a>
      );
    }
  }

  renderSaveMethods () {
    if ((this.context.schema && !this.context.schemaEntry) ||
        (this.context.page && this.context.page.state === 'published') ||
        (this.context.schemaEntry && this.context.schemaEntry._state === 'published')) {
      return (
        <div className='save-action' onClick={this.savePage.bind(this)}>
          <i className='material-icons'>public</i>
          <span>Update</span>
        </div>
      );
    } else {
      return (
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
      );
    }
  }

  renderSave () {
    if (this.context.activePanelType === 'pageBuild' && (this.context.page || this.context.schema) && this.state.save) {
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

  renderStatus () {
    if (this.context.draft && this.state.draft) {
      return <Status fetchCurrent={this.fetchCurrent.bind(this)} state={this.state.state} stateMessage={this.state.stateMessage} draft={this.state.draft} />;
    }
  }

  render () {
    return (
      <div className='page-actions'>
        {this.renderDisplayMenu()}
        <A href={this.context.lastDashboard} className={cx('top-bar-button', this.context.activePanelType !== 'pageBuild' && 'active')}><i className='material-icons'>dashboard</i></A>
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
  schema: React.PropTypes.object,
  schemaEntry: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  lastDashboard: React.PropTypes.string.isRequired,
  display: React.PropTypes.string.isRequired,
  changeDisplay: React.PropTypes.func.isRequired,
  previewToggle: React.PropTypes.func.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  closeOverlay: React.PropTypes.func.isRequired,
  activePanelType: React.PropTypes.string
};
