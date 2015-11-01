import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../a';
import Animate from '../../animate';
import Status from './status';

// import RevisionsOverlay from '../revisions-overlay';

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

  savePage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    // let actions, clone, label;
    // if (this.props.page) {
    //   actions = pageActions;
    //   clone = cloneDeep(this.props.page);
    //   clone.data = this.state.draft.data;
    //   clone.updatedBy = this.props.user._id;
    //   label = 'Page';
    //   this.setState({
    //     state: 'loading',
    //     stateMessage: 'Saving page'
    //   });
    // } else if (this.props.schemaEntry) {
    //   actions = schemaEntriesActionsFactory(this.props.schema.slug);
    //   clone = cloneDeep(this.props.schemaEntry);
    //   label = this.props.schemaEntry._title;
    //   clone._data = this.state.draft.data;
    //   clone._schemaLinks = this.state.draft.schemaLinks;
    //   clone._updatedBy = this.props.user._id;
    //   this.setState({
    //     state: 'loading',
    //     stateMessage: 'Saving '+this.props.schemaEntry._title
    //   });
    // } else if (this.props.schema) {
    //   actions = schemaActions;
    //   clone = cloneDeep(this.props.schema);
    //   clone.data = this.state.draft.data;
    //   clone.schemaLinks = this.state.draft.schemaLinks;
    //   clone.updatedBy = this.props.user._id;
    //   label = 'Schema template';
    //   this.setState({
    //     state: 'loading',
    //     stateMessage: 'Saving schema template'
    //   });
    // } else {
    //   this.setState({
    //     state: 'error',
    //     stateMessage: 'Something went wrong'
    //   });
    //   return;
    // }
    //
    // actions
    //   .update(clone)
    //   .then((result) => {
    //     let draftClone = cloneDeep(this.state.draft);
    //
    //     draftClone.__v = result.__v;
    //     draftClone.actions = [];
    //     draftClone.data = result._data || result.data;
    //
    //     return draftActions.update(draftClone);
    //   })
    //   .then(() => {
    //     this.setState({
    //       state: 'success',
    //       stateMessage: label+' saved successfully'
    //     });
    //     this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       state: 'error',
    //       stateMessage: 'Error occurred while saving'
    //     });
    //   });
  }

  publishPage (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.successTimeout);

    // Publish only for pages and schema entries
    if (!this.props.page && !this.props.schemaEntry) {
      return;
    }

    // let clone, actions;
    //
    // if (this.props.page) {
    //   this.setState({
    //     state: 'loading',
    //     stateMessage: 'Publishing page'
    //   });
    //   actions = pageActions;
    //   clone = cloneDeep(this.props.page);
    //   clone.state = 'published';
    //   clone.data = this.state.draft.data;
    //   clone.updatedBy = this.props.user._id;
    // } else if (this.props.schemaEntry) {
    //   this.setState({
    //     state: 'loading',
    //     stateMessage: 'Publishing '+this.props.schemaEntry._title
    //   });
    //   actions = schemaEntriesActionsFactory(this.props.schema.slug);
    //   clone = cloneDeep(this.props.schemaEntry);
    //   clone._state = 'published';
    //   clone._data = this.state.draft.data;
    //   clone._schemaLinks = this.state.draft.schemaLinks;
    //   clone._updatedBy = this.props.user._id;
    // }
    //
    //
    // actions
    //   .update(clone)
    //   .then((result) => {
    //     let draftClone = cloneDeep(this.state.draft);
    //
    //     draftClone.actions = [];
    //     draftClone.data = result._data || result.data;
    //     draftClone.__v = result.__v;
    //
    //     return draftActions.update(draftClone);
    //   })
    //   .then((draft) => {
    //     this.setState({
    //       state: 'success',
    //       stateMessage: 'Published successfully'
    //     });
    //     this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       state: 'error',
    //       stateMessage: 'Error publishing'
    //     });
    //   });
  }

  fetchCurrent (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    clearTimeout(this.successTimeout);

    // this.setState({
    //   state: 'loading',
    //   stateMessage: 'Dropping draft changes'
    // });
    //
    // let current;
    // if (this.props.page) {
    //   current = this.props.page;
    // } else if (this.props.schemaEntry) {
    //   current = this.props.schemaEntry;
    // } else if (this.props.schema) {
    //   current = this.props.schema;
    // } else {
    //   this.setState({
    //     state: 'error',
    //     stateMessage: 'Something went wrong'
    //   });
    //   return;
    // }
    //
    // let draftClone = cloneDeep(this.state.draft);
    // draftClone.__v = current.__v;
    // draftClone.data = current._data || current.data;
    // draftClone.actions = [];
    //
    // if (current.schemaLinks || current._schemaLinks) {
    //   draftClone.schemaLinks = current._schemaLinks || current.schemaLinks;
    // }
    //
    // draftActions
    //   .update(draftClone)
    //   .then(() => {
    //     this.setState({
    //       state: 'success',
    //       stateMessage: 'Draft dropped successfully'
    //     });
    //     this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       state: 'error',
    //       stateMessage: 'Error dropping draft'
    //     });
    //   });
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

  onRestore (__v) {
    this.props.closeOverlay();

    this.setState({
      saving: true,
      savingLabel: 'Restoring revision'
    });

    // let actions, current;
    // if (this.props.page) {
    //   actions = pageActions;
    //   current = this.props.page;
    // } else if (this.props.schemaEntry) {
    //   actions = schemaEntriesActionsFactory(this.props.schema.slug);
    //   current = this.props.schemaEntry;
    // } else if (this.props.schema) {
    //   actions = schemaActions;
    //   current = this.props.schema;
    // } else {
    //   this.setState({
    //     state: 'error',
    //     stateMessage: 'Something went wrong'
    //   });
    //   return;
    // }
    //
    // actions
    //   .restore({
    //     _id: current._id,
    //     __v
    //   })
    //   .then((result) => {
    //     let draftClone = cloneDeep(this.state.draft);
    //
    //     draftClone.actions = [];
    //     draftClone.data = result._data || result.data;
    //     draftClone.__v = result.__v;
    //
    //     if (result.schemaLinks || result._schemaLinks) {
    //       draftClone.schemaLinks = result._schemaLinks || result.schemaLinks;
    //     }
    //
    //     return Q.all([result, draftActions.update(draftClone)]);
    //   })
    //   .spread((result, draft) => {
    //     this.setState({
    //       state: 'success',
    //       stateMessage: 'Revision restored successfully'
    //     });
    //     this.successTimeout = setTimeout(this.outSuccess.bind(this), 2000);
    //
    //     if (this.props.page) {
    //       Router.prototype.navigate('/admin/page/'+result.slug, {trigger: false, replace: true});
    //     } else if (this.props.schemaEntry) {
    //       Router.prototype.navigate('/admin/schema/'+this.props.schema.slug+'/'+result._slug+'/single', {trigger: false, replace: true});
    //     } else if (this.props.schema) {
    //       Router.prototype.navigate('/admin/schemas/'+result.slug+'/template', {trigger: false, replace: true});
    //     }
    //   })
    //   .catch(() => {
    //     this.setState({
    //       success: false,
    //       stateMessage: 'Error restoring revision'
    //     });
    //   });
  }

  onRevisionsClick (event) {
    event.preventDefault();

    // let page;
    // if (this.props.page) {
    //   page = this.props.page;
    // } else if (this.props.schema) {
    //   page = this.props.schema;
    // } else {
    //   this.setState({
    //     state: 'error',
    //     stateMessage: 'Something went wrong'
    //   });
    //   return;
    // }
    //
    // let current = {
    //   _id: {
    //     _id: page._id,
    //     __v: page.__v
    //   },
    //   date: page.updatedDate,
    //   user: page.updatedBy,
    //   title: page.title
    // };
    //
    // this.props.addOverlay(
    //   <RevisionsOverlay current={current} onRestore={this.onRestore.bind(this)} />
    // );
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
      return <Status fetchCurrent={this.fetchCurrent.bind(this)} state={this.state.state} stateMessage={this.state.stateMessage} draft={this.props.draft} />;
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
