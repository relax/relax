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

  onCloseTab (_id, active, event) {
    event.preventDefault();
    event.stopPropagation();

    tabActions
      .remove(_id)
      .then(() => {
        if (active) {
          var to = '/admin/pages';
          forEach(this.state.tabs, (tab, ind) => {
            if (tab._id._id === _id._id) {
              let toTab = false;
              if (ind < this.state.tabs.length - 1) {
                toTab = this.state.tabs[ind+1];
              } else if (ind !== 0) {
                toTab = this.state.tabs[ind-1];
              }
              if (toTab !== false) {
                if (toTab.page) {
                  to = '/admin/page/'+toTab.page.slug;
                } else if (toTab.userSchema) {
                  to = '/admin/schemas/'+toTab.userSchema.slug+'/template';
                } else if (toTab.schemaEntry) {
                  to = '/admin/schema/'+toTab.schemaEntry.schemaSlug+'/'+toTab.schemaEntry.slug+'/single';
                }
              }
              return false;
            }
          });
          Router.prototype.navigate(to, {trigger: true});
        }
      });
  }

  onAddTabClick (event) {
    event.preventDefault();
    this.context.addOverlay(
      <AddOverlay />
    );
  }

  renderTab (tab) {
    let slug, title, link, active = this.context.activePanelType === 'pageBuild';

    if (tab.page) {
      slug = tab.page.slug;
      title = tab.page.title;
      active = active && this.context.page && this.context.page.slug === slug;
      link = '/admin/page/'+slug;
    } else if (tab.userSchema) {
      slug = tab.userSchema.slug;
      title = tab.userSchema.title+' (template)';
      active = active && this.context.schema && this.context.schema.slug === slug && !this.context.schemaEntry;
      link = '/admin/schemas/'+slug+'/template';
    } else if (tab.schemaEntry) {
      slug = tab.schemaEntry.slug;
      title = tab.schemaEntry.title;
      active = active && this.context.schemaEntry && this.context.schema && this.context.schemaEntry._slug === slug && this.context.schema.slug === tab.schemaEntry.schemaSlug;
      link = '/admin/schema/'+tab.schemaEntry.schemaSlug+'/'+slug+'/single';
    } else {
      return;
    }

    return (
      <A href={link} className={cx('tab', active && 'selected')} key={tab._id._id}>
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
  schema: React.PropTypes.object,
  schemaEntry: React.PropTypes.object,
  draft: React.PropTypes.object,
  editing: React.PropTypes.bool.isRequired,
  addOverlay: React.PropTypes.func.isRequired,
  activePanelType: React.PropTypes.string
};
