import Component from 'components/component';
import React from 'react';
import {selectElement} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Breadcrumbs from './breadcrumbs';

@connect(
  (state) => ({
    selectedPath: state.pageBuilder.selectedPath,
    selectedElement: state.pageBuilder.selectedElement
  }),
  (dispatch) => bindActionCreators({selectElement}, dispatch)
)
export default class BreadcrumbsContainer extends Component {
  render () {
    return (
      <Breadcrumbs {...this.props} />
    );
  }
}
