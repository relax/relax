import React from 'react';
import {Component} from 'relax-framework';
import Tabs from './tabs';
import Breadcrumbs from './breadcrumbs';
import cx from 'classnames';

export default class PropsMenu extends Component {

  getInitialState () {
    return {
      tab: 'style',
      switchSide: false,
      opened: null
    };
  }

  changeTab (tab, event) {
    event.preventDefault();
    this.setState({tab});
  }

  toggleOpen (event) {
    event.preventDefault();
    this.setState({opened: !this.isOpened()});
  }

  toggleSide (event) {
    event.preventDefault();
    this.setState({switchSide: !this.state.switchSide});
  }

  isOpened () {
    return this.state.opened === null ? this.context.selected !== false && this.context.selected !== 'body' : this.state.opened;
  }

  renderTabButton (tab) {
    var className = 'tab';
    if (this.state.tab === tab) {
      className += ' selected';
    }
    return (
      <div className={className} onClick={this.changeTab.bind(this, tab)}>{tab}</div>
    );
  }

  renderTabs () {
    return (
      <div className='tabs'>
        {this.renderTabButton('style')}
        {this.renderTabButton('settings')}
        {this.renderTabButton('layers')}
      </div>
    );
  }

  renderBreadcrumbs () {
    return (
      <Breadcrumbs />
    );
  }

  renderTab () {
    if (Tabs[this.state.tab]) {
      var Tab = Tabs[this.state.tab];
      return <Tab />;
    }
  }

  renderButtons () {
    return (
      <div className='menu-triggers'>
        <div className='close-btn' onClick={this.toggleOpen.bind(this)}>
          <i className='material-icons'>{this.isOpened() ? 'close' : 'menu'}</i>
        </div>
        <div className='switch-btn' onClick={this.toggleSide.bind(this)}>
          <i className='material-icons'>{this.state.switchSide ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}</i>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className={cx('advanced-menu', this.isOpened() && 'opened', this.state.switchSide && 'left')}>
        {this.renderTabs()}
        {this.renderBreadcrumbs()}
        {this.renderTab()}
        {this.renderButtons()}
      </div>
    );
  }
}

PropsMenu.propTypes = {
  panel: React.PropTypes.any.isRequired
};

PropsMenu.contextTypes = {
  selected: React.PropTypes.any.isRequired
};
