import React from 'react';
import {Component} from 'relax-framework';

import PageActions from './page-actions';
import Tab from './tab';

// import AddOverlay from '../add-overlay';

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
    schemaEntry: React.PropTypes.object,
    removeTab: React.PropTypes.func
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
        {this.props.tabs && this.props.tabs.map(this.renderTab, this)}
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
        removeTab={this.props.removeTab}
      />
    );
  }
}
