import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import A from '../../a';
import Animate from '../../animate';
import Status from './status';

export default class PageActions extends Component {
  static propTypes = {
    lastDashboard: PropTypes.string.isRequired,
    activePanelType: PropTypes.string.isRequired,
    collapseSave: PropTypes.func.isRequired,
    previewToggle: PropTypes.func.isRequired,
    expandSave: PropTypes.func.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    onRevisions: PropTypes.func.isRequired,
    draft: PropTypes.object.isRequired,
    fetchCurrent: PropTypes.func.isRequired,
    state: PropTypes.string,
    stateMessage: PropTypes.string.isRequired,
    page: PropTypes.object.isRequired,
    save: PropTypes.bool.isRequired,
    saveDraft: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    hasRevisions: PropTypes.bool.isRequired,
    isPublished: PropTypes.bool.isRequired,
    savePage: PropTypes.func.isRequired,
    publishPage: PropTypes.func.isRequired
  }

  onSaveEnter () {
    clearTimeout(this.saveMenuTimeout);
  }

  onSaveLeave () {
    this.saveMenuTimeout = setTimeout(this.props.collapseSave, 600);
  }

  previewToggle (event) {
    event.preventDefault();
    this.props.previewToggle();
  }

  onSaveClick (event) {
    event.preventDefault();
    this.props.expandSave();
  }

  changeDisplay (display, event) {
    event.preventDefault();
    this.props.changeDisplay(display);
  }

  onRevisionsClick (event) {
    event.preventDefault();
    this.props.onRevisions();
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
          <a href='#' className='top-bar-button text-button' onClick={::this.previewToggle}>Preview</a>
          {this.renderSaveButton()}
        </div>
      </div>
    );
  }

  renderStatus () {
    if (this.props.draft && this.props.activePanelType === 'pageBuild') {
      return (
        <Status
          fetchCurrent={this.props.fetchCurrent}
          state={this.props.state}
          stateMessage={this.props.stateMessage}
          draft={this.props.draft}
          currentVersion={this.props.page.__v}
        />
      );
    }
  }

  renderSaveButton () {
    let result;
    if (this.props.isPublished) {
      result = (
        <a href='#' className='top-bar-button text-button primary save-button' onClick={this.props.savePage}>
          <span>Update</span>
        </a>
      );
    } else {
      result = (
        <a href='#' className='top-bar-button text-button primary save-button' onClick={::this.onSaveClick} onMouseLeave={::this.onSaveLeave} onMouseEnter={::this.onSaveEnter}>
          <span>Save...</span>
          {this.renderSave()}
        </a>
      );
    }
    return result;
  }

  renderSave () {
    if (this.props.activePanelType === 'pageBuild' && this.props.save) {
      return (
        <Animate transition='slideDownIn'>
          <div className='save-menu'>
            <div className='save-action' onClick={this.props.savePage}>
              <i className='material-icons'>save</i>
              <span>Save</span>
            </div>
            <div className='save-action' onClick={this.props.publishPage}>
              <i className='material-icons'>public</i>
              <span>Save and publish</span>
            </div>
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
    const hasRevisions = this.props.hasRevisions;

    if (this.props.activePanelType === 'pageBuild' && hasRevisions) {
      return (
        <a href='#' className='top-bar-button' onClick={::this.onRevisionsClick}><i className='material-icons'>history</i></a>
      );
    }
  }
}
