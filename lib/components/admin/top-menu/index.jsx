import React from 'react';
import {Component, Router} from 'relax-framework';
import cx from 'classnames';
import forEach from 'lodash.foreach';

import A from '../../a';
import AddOverlay from '../add-overlay';
import PageActions from './page-actions';

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

  render () {
    return (
      <div className='top-bar'>
        <PageActions />
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
  draft: React.PropTypes.object,
  editing: React.PropTypes.bool.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  activePanelType: React.PropTypes.string
};
