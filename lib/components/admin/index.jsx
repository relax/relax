import React from 'react';
import {Component} from 'relax-framework';
import TopMenu from './top-menu';
import MenuBar from './menu-bar';
import Backbone from 'backbone';

import panels from './panels';
import Overlay from '../overlay';

export default class Admin extends Component {

  getInitialState () {
    this.changeDisplayBind = this.changeDisplay.bind(this);
    this.previewToggleBind = this.previewToggle.bind(this);
    this.addOverlayBind = this.addOverlay.bind(this);
    this.closeOverlayBind = this.closeOverlay.bind(this);

    return {
      display: 'desktop',
      editing: true,
      lastDashboard: '/admin',
      overlay: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.page) {
      this.updateLastDashboardPage();
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.display !== this.state.display) {
      /* jshint ignore:start */
      window.dispatchEvent(new Event('resize'));
      /* jshint ignore:end */
    }
  }

  getChildContext () {
    return {
      breadcrumbs: this.props.breadcrumbs,
      pages: this.props.pages,
      page: this.props.page,
      elements: this.props.elements,
      media: this.props.media,
      settings: this.props.settings,
      colors: this.props.colors,
      schemas: this.props.schemas,
      schema: this.props.schema,
      schemaEntries: this.props.schemaEntries,
      schemaEntry: this.props.schemaEntry,
      query: this.props.query,
      activePanelType: this.props.activePanelType,
      display: this.state.display,
      changeDisplay: this.changeDisplayBind,
      editing: this.state.editing,
      previewToggle: this.previewToggleBind,
      user: this.props.user,
      users: this.props.users,
      editUser: this.props.editUser,
      tabs: this.props.tabs,
      lastDashboard: this.state.lastDashboard,
      addOverlay: this.addOverlayBind,
      closeOverlay: this.closeOverlayBind
    };
  }

  updateLastDashboardPage () {
    this.setState({
      lastDashboard: '/' + Backbone.history.getFragment()
    });
  }

  changeDisplay (display) {
    this.setState({
      display
    });
  }

  previewToggle () {
    this.setState({
      editing: !this.state.editing
    });
  }

  addOverlay (overlay) {
    this.setState({
      overlay
    });
  }

  closeOverlay () {
    this.setState({
      overlay: false
    });
  }

  renderActivePanel () {
    if (this.props.activePanelType && panels[this.props.activePanelType]) {
      let Panel = panels[this.props.activePanelType];
      return (
        <Panel {...this.state} />
      );
    }
  }

  renderOverlay () {
    if (this.state.overlay !== false) {
      return (
        <Overlay>
          {React.cloneElement(this.state.overlay, {onClose: this.closeOverlayBind})}
        </Overlay>
      );
    }
  }

  render () {
    return (
      <div>
        <TopMenu />
        <div className='admin-holder'>
          {!this.props.page && <MenuBar />}
          <div className='admin-content'>
            {this.renderActivePanel()}
          </div>
        </div>
        {this.renderOverlay()}
      </div>
    );
  }
}

Admin.propTypes = {
  activePanelType: React.PropTypes.string,
  breadcrumbs: React.PropTypes.array,
  user: React.PropTypes.object,
  users: React.PropTypes.array
};

Admin.childContextTypes = {
  breadcrumbs: React.PropTypes.array,
  pages: React.PropTypes.array,
  page: React.PropTypes.object,
  elements: React.PropTypes.object,
  media: React.PropTypes.array,
  settings: React.PropTypes.array,
  colors: React.PropTypes.array,
  schemas: React.PropTypes.array,
  schema: React.PropTypes.object,
  schemaEntries: React.PropTypes.array,
  schemaEntry: React.PropTypes.object,
  query: React.PropTypes.object,
  activePanelType: React.PropTypes.string,
  display: React.PropTypes.string.isRequired,
  changeDisplay: React.PropTypes.func.isRequired,
  editing: React.PropTypes.bool.isRequired,
  previewToggle: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  users: React.PropTypes.array,
  editUser: React.PropTypes.object,
  tabs: React.PropTypes.array,
  lastDashboard: React.PropTypes.string,
  addOverlay: React.PropTypes.func,
  closeOverlay: React.PropTypes.func
};
