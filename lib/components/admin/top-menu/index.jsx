import React from 'react';
import {Component, Router} from 'relax-framework';
import cx from 'classnames';
import forEach from 'lodash.foreach';

import A from '../../a';
import AddOverlay from './add-overlay';

import pageActions from '../../../client/actions/page';
import tabsStore from '../../../client/stores/tabs';
import tabActions from '../../../client/actions/tab';

export default class TopMenu extends Component {
  getInitialState () {
    return {
      tabs: this.context.tabs
    };
  }

  getInitialCollections () {
    return {
      tabs: tabsStore.getCollection({
        user: this.context.user._id
      })
    };
  }

  publishPage (event) {
    event.preventDefault();

    this.context.page.state = 'published';
    pageActions.update(this.context.page);
  }

  previewToggle (event) {
    event.preventDefault();
    this.context.previewToggle();
  }

  changeDisplay (display, event) {
    event.preventDefault();
    this.context.changeDisplay(display);
  }

  onCloseTab (id, active, event) {
    event.preventDefault();
    event.stopPropagation();

    if (active) {
      var to = '/admin/pages';
      forEach(this.state.tabs, (tab, ind) => {
        if (tab._id === id) {
          if (ind < this.state.tabs.length - 1) {
            to = '/admin/page/'+this.state.tabs[ind+1].pageId.slug;
          } else if (ind !== 0) {
            to = '/admin/page/'+this.state.tabs[ind-1].pageId.slug;
          }
          return false;
        }
      });
      Router.prototype.navigate(to, {trigger: true});
    }

    tabActions.remove(id);
  }

  onAddTabClick (event) {
    event.preventDefault();
    this.context.addOverlay(
      <AddOverlay />
    );
  }

  renderTab (tab) {
    const slug = tab.pageId.slug;
    const title = tab.pageId.title;
    const active = this.context.activePanelType === 'pageBuild' && this.context.page && this.context.page.slug === slug;
    const link = '/admin/page/'+slug;

    return (
      <A href={link} className={cx('tab', active && 'selected')} key={tab._id}>
        <span>{title}</span>
        <span className='close' onClick={this.onCloseTab.bind(this, tab._id, active)}><i className='material-icons'>close</i></span>
      </A>
    );
  }

  renderTabs () {
    return (
      <div className='tabs'>
        {this.state.tabs && this.state.tabs.map(this.renderTab, this)}
        <a href='#' className='add-btn' onClick={this.onAddTabClick.bind(this)}>
          <i className='material-icons'>add</i>
        </a>
      </div>
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

  renderPageActions () {
    // TODO check if editing a page (might be on the options page)
    return (
      <div className='page-actions'>
        {this.renderDisplayMenu()}
        <A href={this.context.lastDashboard} className={cx('top-bar-button', !this.context.page && 'active')}><i className='material-icons'>dashboard</i></A>
        <div className='seperator'></div>
        <div className={cx('right-menu', !this.context.page && 'disabled')}>
          <a href='#' className='top-bar-button'><i className='material-icons'>settings</i></a>
          <a href='#' className='top-bar-button text-button' onClick={this.previewToggle.bind(this)}>Preview</a>
          <a href='#' className='top-bar-button text-button primary' onClick={this.publishPage.bind(this)}>Publish</a>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className='top-bar'>
        {this.renderPageActions()}
        {this.renderTabs()}
      </div>
    );
  }
}

TopMenu.propTypes = {

};

TopMenu.contextTypes = {
  tabs: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  page: React.PropTypes.object,
  display: React.PropTypes.string.isRequired,
  changeDisplay: React.PropTypes.func.isRequired,
  previewToggle: React.PropTypes.func.isRequired,
  editing: React.PropTypes.bool.isRequired,
  lastDashboard: React.PropTypes.string.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  activePanelType: React.PropTypes.string
};
