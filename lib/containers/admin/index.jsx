import * as adminActions from '../../client/actions/admin';
import * as overlaysActions from '../../client/actions/overlays';
import * as pageBuilderActions from '../../client/actions/page-builder';
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

function isBlurred (overlays) {
  let blurred = false;
  forEach(overlays, (overlay) => {
    if (overlay.blur) {
      blurred = true;
      return false;
    }
  });
  return blurred;
}

@connect(
  (state) => ({
    user: state.session.data,
    overlays: state.overlays,
    tabs: state.tabs.data,
    editing: state.pageBuilder.editing,
    linkingData: state.pageBuilder.linkingData,
    blurred: isBlurred(state.overlays)
  }),
  (dispatch) => ({
    ...bindActionCreators(adminActions, dispatch),
    ...bindActionCreators(tabsActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch),
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
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
    overlays: PropTypes.array.isRequired
  }

  getInitState (props = this.props) {
    const params = props.params;
    let lastDashboard = '/admin';
    if (props.children.type.panelSettings.activePanelType !== 'pageBuild') {
      lastDashboard = props.location.pathname;
    }
    return {
      loading: false,
      lastDashboard,
      ...props.children.type.panelSettings,
      id: params.id,
      slug: params.slug,
      entryId: params.entryId
    };
  }

  componentWillReceiveProps (nextProps) {
    const panelSettings = nextProps.children.type.panelSettings;
    const params = nextProps.params;

    if (panelSettings.activePanelType !== this.state.activePanelType ||
        params.slug !== this.state.slug ||
        params.id !== this.state.id ||
        params.entryId !== this.state.entryId) {
      let lastDashboard = this.state.lastDashboard;
      if (panelSettings.activePanelType !== 'pageBuild') {
        lastDashboard = nextProps.location.pathname;
      }
      this.setState({
        loading: true,
        lastDashboard,
        ...panelSettings,
        id: params.id,
        slug: params.slug,
        entryId: params.entryId
      }, () => {
        this.fetchData(nextProps);
      });
    }
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
      case 'schemaList':
        vars.schemaList = {
          schemaId: {
            value: props.params.id,
            type: 'ID!'
          },
          ...props.queryVariables || getQueryVariables(panel.defaultQuery)
        };
        vars.schema = {
          _id: {
            value: props.params.id,
            type: 'ID!'
          }
        };
        vars.schemaListCount = {
          schemaId: {
            value: props.params.id,
            type: 'ID!'
          }
        };
        break;
      case 'pageBuild':
        vars.page = {
          _id: {
            value: props.params && props.params.id,
            type: 'ID!'
          }
        };
        vars.draft = {
          id: {
            value: props.params && props.params.id,
            type: 'ID!'
          }
        };
        vars.tab = {
          id: {
            value: props.params && props.params.id,
            type: 'ID!'
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
        if (props.params && props.params.id !== 'new') {
          vars[activePanelType] = {
            _id: {
              value: props.params && props.params.id,
              type: 'ID!'
            }
          };
        } else {
          panelFragments[activePanelType] && delete panelFragments[activePanelType];
        }
        break;
      case 'schemaEntry':
        vars.schema = {
          _id: {
            value: props.params.id,
            type: 'ID!'
          }
        };
        if (props.params && props.params.entryId !== 'new') {
          vars.schemaEntry = {
            id: {
              value: props.params && props.params.entryId,
              type: 'ID!'
            },
            schemaId: {
              value: props.params && props.params.id,
              type: 'ID!'
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

  render () {
    return (
      <div className='max-size'>
        <Admin {...this.props} {...this.props.params} {...this.state}>
          {cloneElement(this.props.children, {
            ...this.props,
            ...this.props.params,
            ...this.state,
            ref: 'panel'
          })}
        </Admin>
        <Overlays overlays={this.props.overlays} />
      </div>
    );
  }
}
