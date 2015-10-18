import findWhere from 'lodash.findwhere';
import React, {cloneElement, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';

import * as adminActions from '../../actions/admin';
import queryProps from '../../decorators/query-props';
import Admin from '../../components/admin';
import panels from '../../components/admin/panels';
import adminRoutes from '../../routers/admin';

@connect(
  (state) => ({
    user: state.session.data,
    display: state.display
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
@queryProps
export default class AdminContainer extends Component {
  static fragments = Admin.fragments

  static propTypes = {
    activePanelType: PropTypes.string,
    children: PropTypes.any,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    query: PropTypes.object,
    slug: PropTypes.string,
    getAdmin: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  }

  static defaultProps = {
    query: {}
  }

  getInitialState (props = this.props) {
    return {
      loading: true,
      ...this.getParams(props)
    };
  }

  componentWillMount () {
    this.fetchData(this.props);
  }

  componentWillReceiveProps (nextProps) {
    const params = this.getParams(nextProps);

    if (params.activePanelType !== this.state.activePanelType ||
        params.slug !== this.state.slug) {
      this.setState({
        loading: true,
        ...params
      }, () => {
        this.fetchData(nextProps);
      });
    }
  }

  getParams (props) {
    var location = [];

    props.routes.forEach((route) => {
      route.path && location.push(route.path);
    });

    const routeInfo = findWhere(adminRoutes, {
      path: location.join('/').substring(1)
    });

    return routeInfo && routeInfo.params;
  }

  fetchData (props) {
    const {activePanelType} = this.state;
    const panel = panels[activePanelType];
    const vars = {};

    const panelFragments = Object.assign({}, panel.fragments);

    // This probably could be encapsulated somehow
    switch (activePanelType) {
      case 'pages':
        vars[activePanelType] = {
          ...props.queryVariables
        };
        break;
      case 'settings':
        vars.settings = {
          ids: {
            value: panel.settings,
            type: '[String]!'
          }
        };
        break;
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
          ...this.state
        })}
      </Admin>
    );
  }
}
