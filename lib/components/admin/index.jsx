import React from 'react';

import {Component} from 'relax-framework';
import MenuBar from './menu-bar';
import cx from 'classnames';
import panels from './panels';
// import TopMenu from './top-menu';
// import Overlay from '../overlay';
// import Lightbox from '../lightbox';


export default class Admin extends Component {
  static fragments = {}

  static propTypes = {
    activePanelType: React.PropTypes.string,
    breadcrumbs: React.PropTypes.array,
    user: React.PropTypes.object,
    slug: React.PropTypes.string,
    getAdmin: React.PropTypes.func
  }

  getInitialState () {
    // this.changeDisplayBind = this.changeDisplay.bind(this);
    // this.previewToggleBind = this.previewToggle.bind(this);
    // this.addOverlayBind = this.addOverlay.bind(this);
    // this.closeOverlayBind = this.closeOverlay.bind(this);
    // this.switchOverlayBackgroundBind = this.switchOverlayBackground.bind(this);
    // this.addLightboxBind = this.addLightbox.bind(this);

    return {
      display: 'desktop',
      editing: true,
      lastDashboard: '/admin',
      overlay: false,
      lightbox: false
    };
  }

  componentWillMount () {
    // this.props.getAdmin(this.constructor.fragments);
  }

  //
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.activePanelType !== 'pageBuild') {
  //     this.updateLastDashboardPage();
  //   }
  // }
  //
  // componentDidUpdate (prevProps, prevState) {
  //   if (prevState.display !== this.state.display) {
  //     /* jshint ignore:start */
  //     window.dispatchEvent(new Event('resize'));
  //     /* jshint ignore:end */
  //   }
  // }
  //
  // getChildContext () {
  //   return {
  //     breadcrumbs: this.props.breadcrumbs,
  //     styles: this.props.styles,
  //     pages: this.props.pages,
  //     page: this.state.page,
  //     menus: this.props.menus,
  //     menu: this.props.menu,
  //     draft: this.props.draft,
  //     elements: this.props.elements,
  //     media: this.props.media,
  //     settings: this.props.settings,
  //     colors: this.props.colors,
  //     schemas: this.props.schemas,
  //     schema: this.state.schema,
  //     schemaEntries: this.props.schemaEntries,
  //     schemaEntry: this.state.schemaEntry,
  //     query: this.props.query,
  //     count: this.props.count,
  //     activePanelType: this.props.activePanelType,
  //     display: this.state.display,
  //     changeDisplay: this.changeDisplayBind,
  //     editing: this.state.editing,
  //     previewToggle: this.previewToggleBind,
  //     user: this.props.user,
  //     users: this.props.users,
  //     editUser: this.props.editUser,
  //     tabs: this.props.tabs,
  //     lastDashboard: this.state.lastDashboard,
  //     addOverlay: this.addOverlayBind,
  //     closeOverlay: this.closeOverlayBind,
  //     switchOverlayBackground: this.switchOverlayBackgroundBind,
  //     addLightbox: this.addLightboxBind
  //   };
  // }
  //
  // onDraftChange () {
  //   this.forceUpdate();
  // }
  //
  // updateLastDashboardPage () {
  //   this.setState({
  //     lastDashboard: '/' + Backbone.history.getFragment()
  //   });
  // }
  //
  // changeDisplay (display) {
  //   this.setState({
  //     display
  //   });
  // }
  //
  // previewToggle () {
  //   this.setState({
  //     editing: !this.state.editing
  //   });
  // }
  //
  // addOverlay (overlay, overlayProps = {}) {
  //   this.setState({
  //     overlay,
  //     overlayProps
  //   });
  // }
  //
  // closeOverlay () {
  //   this.setState({
  //     overlay: false
  //   });
  // }
  //
  // switchOverlayBackground () {
  //   this.state.overlayProps.switch = this.state.overlayProps.switch === true ? false : true;
  //   this.setState({
  //     overlayProps: this.state.overlayProps
  //   });
  // }
  //
  // addLightbox (lightbox, lightboxProps = {}) {
  //   this.setState({
  //     lightbox,
  //     lightboxProps
  //   });
  // }
  //
  // closeLightbox () {
  //   this.setState({
  //     lightbox: false
  //   });
  // }

  renderActivePanel () {
    if (this.props.activePanelType && panels[this.props.activePanelType]) {
      const Panel = panels[this.props.activePanelType];
      return (
        <Panel store={this.props.store} />
      );
    }
  }

  // renderOverlay () {
  //   if (this.state.overlay !== false) {
  //     return (
  //       <Overlay {...this.state.overlayProps}>
  //         {React.cloneElement(this.state.overlay, {onClose: this.closeOverlayBind, user: this.props.user})}
  //       </Overlay>
  //     );
  //   }
  // }
  //
  // renderLightbox () {
  //   if (this.state.lightbox !== false) {
  //     return (
  //       <Lightbox {...this.state.lightboxProps} onClose={this.closeLightbox.bind(this)}>
  //         {this.state.lightbox}
  //       </Lightbox>
  //     );
  //   }
  // }

  render () {
    return (
      <div>
        <div className={cx('blurr', this.state.overlay !== false && 'blurred')}>
          <div className='admin-holder'>
            {this.props.activePanelType !== 'pageBuild' && <MenuBar />}
            <div className='admin-content'>
              {this.renderActivePanel()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.childContextTypes = {
  breadcrumbs: React.PropTypes.array,
  styles: React.PropTypes.array,
  pages: React.PropTypes.array,
  page: React.PropTypes.object,
  menus: React.PropTypes.array,
  menu: React.PropTypes.object,
  draft: React.PropTypes.object,
  elements: React.PropTypes.object,
  media: React.PropTypes.array,
  settings: React.PropTypes.array,
  colors: React.PropTypes.array,
  schemas: React.PropTypes.array,
  schema: React.PropTypes.object,
  schemaEntries: React.PropTypes.array,
  schemaEntry: React.PropTypes.object,
  query: React.PropTypes.object,
  count: React.PropTypes.number,
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
  closeOverlay: React.PropTypes.func,
  switchOverlayBackground: React.PropTypes.func,
  addLightbox: React.PropTypes.func
};
