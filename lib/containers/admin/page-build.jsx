import * as pageActions from '../../client/actions/page';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import PageBuild from '../../components/admin/panels/page-build';

@connect(
  (state) => ({
    page: state.page.data,
    colors: state.colors.data
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch)
)
export default class PageBuildContainer extends Component {
  static fragments = PageBuild.fragments

  static panelSettings = {
    activePanelType: 'pageBuild'
  }

  static propTypes = {
    page: PropTypes.object,
    user: PropTypes.object
  }

  render () {
    return (
      <PageBuild
        {...this.props}
        {...this.state}
      />
    );
  }
}
