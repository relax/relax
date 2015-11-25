import React from 'react';
import {Component} from 'relax-framework';

import AddOverlay from '../../../containers/add-overlay';
import PageActionsContainer from '../../../containers/admin/page-actions';
import Tab from './tab';

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
    removeTab: React.PropTypes.func,
    changeDisplay: React.PropTypes.func,
    addOverlay: React.PropTypes.func.isRequired,
    closeOverlay: React.PropTypes.func.isRequired
  }

  onAddTabClick (event) {
    event.preventDefault();
    this.props.addOverlay('addTab', <AddOverlay onClose={::this.onCloseAdd} />);
  }

  onCloseAdd () {
    this.props.closeOverlay('addTab');
  }

  render () {
    return (
      <div className='top-bar'>
        <PageActionsContainer {...this.props} />
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

  renderTab (tab, key) {
    return (
      <Tab
        tab={tab}
        activePanelType={this.props.activePanelType}
        tabsCount={this.props.tabs.length}
        removeTab={this.props.removeTab}
        key={tab && tab._id && tab._id._id || key}
      />
    );
  }
}
