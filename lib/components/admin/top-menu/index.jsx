import React from 'react';
import {Component, Router} from 'relax-framework';
import cx from 'classnames';
import forEach from 'lodash.foreach';

import A from '../../a';
// import AddOverlay from '../add-overlay';
import Tab from './tab';
import PageActions from './page-actions';

export default class TopMenu extends Component {
  static fragments = {
    tabs: Tab.fragments.tab
  }

  static propTypes = {
    tabs: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    editing: React.PropTypes.bool.isRequired,
    activePanelType: React.PropTypes.string,
    page: React.PropTypes.object,
    schema: React.PropTypes.object,
    schemaEntry: React.PropTypes.object
  }

  getInitialState () {
    return {
      tabs: this.context.tabs
    };
  }

  onAddTabClick (event) {
    event.preventDefault();
    // this.context.addOverlay(
    //   <AddOverlay />
    // );
  }

  render () {
    return (
      <div className='top-bar'>
        <PageActions {...this.props} />
        {this.renderTabs()}
      </div>
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

  renderTab (tab) {
    return (
      <Tab
        tab={tab}
        activePanelType={this.props.activePanelType}
        tabsCount={this.props.tabs.length}
      />
    );
  }
}
