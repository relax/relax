import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';
import MenuBar from './menu-bar';
import cx from 'classnames';
import panels from './panels';
import TopMenu from './top-menu';
// import Overlay from '../overlay';
// import Lightbox from '../lightbox';
import * as adminActions from '../../actions/admin';
import queryProps from '../../decorators/query-props';

@connect(
  (state) => ({
    user: state.session.data,
    display: state.display
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
@queryProps
export default class Admin extends Component {
  static fragments = {
    session: {
      _id: 1,
      username: 1,
      name: 1,
      email: 1
    }
  }

  static propTypes = {
    activePanelType: PropTypes.string,
    breadcrumbs: PropTypes.array,
    user: PropTypes.object,
    query: PropTypes.object,
    slug: PropTypes.string,
    getAdmin: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  }

  static defaultProps = {
    query: {},
    breadcrumbs: []
  }

  getInitialState () {
    // this.changeDisplayBind = this.changeDisplay.bind(this);
    // this.previewToggleBind = this.previewToggle.bind(this);
    // this.addOverlayBind = this.addOverlay.bind(this);
    // this.closeOverlayBind = this.closeOverlay.bind(this);
    // this.switchOverlayBackgroundBind = this.switchOverlayBackground.bind(this);
    // this.addLightboxBind = this.addLightbox.bind(this);

    return {
      loading: true
    };
  }

  componentWillMount () {
    this.fetchData(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activePanelType !== this.props.activePanelType || this.props.slug !== nextProps.slug) {
      this.setState({
        loading: true
      });
      this.fetchData(nextProps);
    }
  }

  fetchData (props) {
    const panel = panels[props.activePanelType];
    const vars = {};
    let panelFragments = panel.fragments || {};

    // This probably could be encapsulated somehow
    switch (props.activePanelType) {
      case 'pages':
        vars[props.activePanelType] = {
          ...props.queryVariables
        };
        break;
      case 'page':
        if (props.slug !== 'new') {
          vars.page = {
            slug: {
              value: props.slug,
              type: 'String!'
            }
          };
        } else {
          panelFragments = {};
        }
        break;
      default:
    }

    props
      .getAdmin(buildQueryAndVariables(
        mergeFragments(
          this.constructor.fragments,
          panelFragments
        ),
        vars
      ))
      .done(() => {
        this.setState({
          loading: false
        });
      });
  }

  updatePage (data) {
    const panel = panels[this.props.activePanelType];
    const pageFragments = mergeFragments(
      this.constructor.fragments,
      panel.fragments
    );
    return this.props.updatePage(pageFragments, data);
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
  //
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
        <div className={cx('blurr', this.state.overlay && 'blurred')}>
          <TopMenu
            activePanelType={this.props.activePanelType}
            user={this.props.user}
            tabs={[]}
            display={this.props.display}
          />
          <div className='admin-holder'>
            {this.props.activePanelType !== 'pageBuild' && <MenuBar user={this.props.user} activePanelType={this.props.activePanelType} breadcrumbs={this.props.breadcrumbs} />}
            <div className='admin-content'>
              {!this.state.loading && this.renderActivePanel()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderActivePanel () {
    if (this.props.activePanelType && panels[this.props.activePanelType]) {
      const Panel = panels[this.props.activePanelType];
      return (
        <Panel {...this.props} updatePage={this.updatePage} />
      );
    }
  }
}
