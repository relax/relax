import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Breadcrumbs from './breadcrumbs';
import DataLinking from '../../../containers/data-linking';
import Tabs from './tabs';

export default class PropsMenu extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  changeTab (tab, event) {
    event.preventDefault();
    const {setMenuTab} = this.props.pageBuilderActions;
    setMenuTab(tab);
  }

  toggleOpen (event) {
    event.preventDefault();
    const {menuOpened} = this.props.pageBuilder;
    const {setMenuOpened} = this.props.pageBuilderActions;
    setMenuOpened(!menuOpened);
  }

  toggleSide (event) {
    event.preventDefault();
    const {menuSwitchSide} = this.props.pageBuilder;
    const {setMenuSide} = this.props.pageBuilderActions;
    setMenuSide(!menuSwitchSide);
  }

  render () {
    const {menuOpened, menuSwitchSide, editing, linkingData} = this.props.pageBuilder;
    return (
      <div className={cx('advanced-menu', menuOpened && editing && 'opened', menuSwitchSide && 'left', linkingData && 'linking')}>
        {!linkingData && this.renderTabs()}
        {!linkingData && this.renderTab()}
        {linkingData && this.renderDataLinking()}
        {this.renderBreadcrumbs()}
        {this.renderButtons()}
      </div>
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

  renderTab () {
    const {menuTab} = this.props.pageBuilder;
    if (Tabs[menuTab]) {
      var Tab = Tabs[menuTab];
      return <Tab {...this.props} />;
    }
  }

  renderDataLinking () {
    return <DataLinking {...this.props} />;
  }

  renderBreadcrumbs () {
    return (
      <Breadcrumbs {...this.props} />
    );
  }

  renderButtons () {
    const {menuOpened, menuSwitchSide} = this.props.pageBuilder;
    return (
      <div className='menu-triggers'>
        <div className='close-btn' onClick={this.toggleOpen.bind(this)}>
          <i className='material-icons'>{menuOpened ? 'close' : 'menu'}</i>
        </div>
        <div className='switch-btn' onClick={this.toggleSide.bind(this)}>
          <i className='material-icons'>{menuSwitchSide ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}</i>
        </div>
      </div>
    );
  }

  renderTabButton (tab) {
    const {menuTab} = this.props.pageBuilder;
    return (
      <div className={cx('tab', menuTab === tab && 'selected')} onClick={this.changeTab.bind(this, tab)}>{tab}</div>
    );
  }
}
