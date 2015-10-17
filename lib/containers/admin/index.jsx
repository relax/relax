import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, mergeFragments, buildQueryAndVariables} from 'relax-framework';

import * as adminActions from '../actions/admin';
import queryProps from '../decorators/query-props';
import Admin from '../components/admin';
import panels from '../components/admin/panels';

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
    query: PropTypes.object,
    slug: PropTypes.string,
    getAdmin: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    display: PropTypes.string.isRequired
  }

  static defaultProps = {
    query: {}
  }

  getInitialState () {
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
    const panelFragments = Object.assign({}, panel.fragments);

    // This probably could be encapsulated somehow
    switch (props.activePanelType) {
      case 'pages':
        vars[props.activePanelType] = {
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
        if (props.slug !== 'new') {
          vars[props.activePanelType] = {
            slug: {
              value: props.slug,
              type: 'String!'
            }
          };
        } else {
          panelFragments[props.activePanelType] && delete panelFragments[props.activePanelType];
        }
        break;
      case 'userEdit':
        vars.user = {
          username: {
            value: props.username,
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
    const panel = panels[this.props.activePanelType];
    const pageFragments = mergeFragments(
      this.constructor.fragments,
      panel.fragments
    );
    return this.props.updatePage(pageFragments, data);
  }

  render () {
    return (
      <Admin {...this.props} {...this.state} />
    );
  }
}
