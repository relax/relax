import {Component} from 'relax-framework';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pageActions from '../../client/actions/page';
import PageBuild from '../../components/admin/panels/page-build';

@connect(
  (state) => ({
    page: state.page.data
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch)
)
export default class PageBuildContainer extends Component {
  static propTypes = {
    page: PropTypes.object,
    user: PropTypes.object
  }

  static panelSettings = {
    activePanelType: 'pageBuild'
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
