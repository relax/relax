import * as adminActions from '../../client/actions/admin';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import elements from '../../components/elements';
import Page from '../../components/page';
import {updateColors} from '../../helpers/colors';

@connect(
  (state) => ({
    page: state.page.data,
    styles: state.styles.data,
    colors: state.colors.data
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class PublicPageContainer extends Component {
  static fragments = {
    colors: {
      _id: 1,
      label: 1,
      value: 1
    },
    styles: {
      _id: 1,
      type: 1,
      options: 1
    }
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired
  }

  static defaultProps = {
    params: {}
  }

  getInitState (props = this.props) {
    const params = props.params;
    updateColors(this.props.colors);

    return {
      loading: false,
      slug: params.slug,
      entrySlug: params.entrySlug
    };
  }

  componentWillReceiveProps (nextProps) {
    const params = nextProps.params;

    if (params.slug !== this.state.slug || params.entrySlug !== this.state.entrySlug) {
      this.setState({
        loading: true,
        slug: params.slug,
        entrySlug: params.entrySlug
      }, () => {
        this.fetchData(nextProps);
      });
    }
  }

  static getQueryAndVariables (props) {
    const vars = {};
    const fragments = {
      ...PublicPageContainer.fragments
    };

    if (props.params && props.params.slug && !props.params.entrySlug) {
      vars.page = {
        slug: {
          value: props.params.slug,
          type: 'String!'
        }
      };
      fragments.page = Page.fragments.page;
    } else if (props.params && props.params.slug && props.params.entrySlug) {
      // TODO schema loading
    } else {
      // frontpage
      fragments.page = Page.fragments.page;
    }

    return buildQueryAndVariables(fragments, vars);
  }

  fetchData (props) {
    props
      .getAdmin(this.constructor.getQueryAndVariables(props))
      .done(() => {
        this.setState({
          loading: false
        });
      });
  }

  render () {
    return (
      <Page {...this.props} {...this.props.params} {...this.state} elements={elements} />
    );
  }
}
