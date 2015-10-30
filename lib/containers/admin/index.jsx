import * as adminActions from '../../client/actions/admin';
import * as displayActions from '../../client/actions/display';
import * as overlaysActions from '../../client/actions/overlays';
import * as tabsActions from '../../client/actions/tabs';

import forEach from 'lodash.foreach';
import React, {cloneElement, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';

import panels from '../../components/admin/panels';
import Admin from '../../components/admin';
import Overlays from '../../components/overlays';
import {getQueryVariables} from '../../decorators/query-props';

@connect(
  (state) => ({
    user: state.session.data,
    display: state.display,
    overlays: state.overlays,
    tabs: state.tabs.data
  }),
  (dispatch) => ({
    ...bindActionCreators(adminActions, dispatch),
    ...bindActionCreators(tabsActions, dispatch),
    ...bindActionCreators(displayActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class AdminContainer extends Component {
  static fragments = Admin.fragments

  static propTypes = {
    activePanelType: PropTypes.string,
    children: PropTypes.any,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getAdmin: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired,
    overlays: PropTypes.array.isRequired
  }

  getInitialState (props = this.props) {
    return {
      loading: false,
      lastDashboard: '/admin',
      ...props.children.type.panelSettings
    };
  }

  componentWillReceiveProps (nextProps) {
    const panelSettings = nextProps.children.type.panelSettings;
    const params = nextProps.params;

    if (panelSettings.activePanelType !== this.state.activePanelType ||
        params.slug !== this.state.slug ||
        params.id !== this.state.id) {
      let lastDashboard = this.state.lastDashboard;
      if (panelSettings.activePanelType !== 'pageBuild') {
        lastDashboard = this.getUrlFromRoutes(nextProps.routes);
      }
      this.setState({
        loading: true,
        lastDashboard,
        ...panelSettings,
        id: params.id,
        slug: params.slug
      }, () => {
        this.fetchData(nextProps);
      });
    }
  }

  getUrlFromRoutes (routes) {
    let str = '';
    forEach(routes, (route, index) => {
      if (typeof route.path !== 'undefined') {
        if (index > 0) {
          str += '/';
        }
        str += route.path;
      }
    });
    return str;
  }

  static getQueryAndVariables (props, state) {
    const {activePanelType} = state;
    const panel = panels[activePanelType];
    const vars = {};

    const panelFragments = Object.assign({}, panel.fragments);

    // This probably could be encapsulated somehow
    switch (activePanelType) {
      case 'media':
      case 'menus':
      case 'pages':
      case 'schemas':
        vars[activePanelType] = {
          ...props.queryVariables || getQueryVariables(panel.defaultQuery)
        };
        break;
      case 'pageBuild':
        vars.page = {
          _id: {
            value: props.params && props.params.id,
            type: 'String!'
          }
        };
        vars.draft = {
          id: {
            value: props.params && props.params.id,
            type: 'String!'
          }
        };
        vars.tab = {
          id: {
            value: props.params && props.params.id,
            type: 'String!'
          },
          type: {
            value: 'page',
            type: 'String!'
          }
        };
        break;
      case 'fonts':
      case 'settings':
        vars.settings = {
          ids: {
            value: panel.settings,
            type: '[String]!'
          }
        };
        break;
      case 'schema':
      case 'page':
      case 'menu':
        if (props.params && props.params.slug !== 'new') {
          vars[activePanelType] = {
            slug: {
              value: props.params && props.params.slug,
              type: 'String!'
            }
          };
        } else {
          panelFragments[activePanelType] && delete panelFragments[activePanelType];
        }
        break;
      case 'userEdit':
        vars.user = {
          username: {
            value: props.params && props.params.username,
            type: 'String!'
          }
        };
        break;
      default:
    }

    return buildQueryAndVariables(
      mergeFragments(
        this.fragments,
        panelFragments
      ),
      vars
    );
  }

  fetchData (props) {
    props
      .getAdmin(this.constructor.getQueryAndVariables(props, this.state))
      .done(() => {
        this.setState({
          loading: false
        });
      });
  }

  updatePage (data) {
    const panel = panels[this.state.activePanelType];
    const pageFragments = mergeFragments(
      this.constructor.fragments,
      panel.fragments
    );
    return this.props.updatePage(pageFragments, data);
  }

  render () {
    return (
      <Admin {...this.props} {...this.props.params} {...this.state}>
        {cloneElement(this.props.children, {
          ...this.props,
          ...this.props.params,
          ...this.state,
          ref: 'panel'
        })}
        <Overlays overlays={this.props.overlays} />
      </Admin>
    );
  }
}
