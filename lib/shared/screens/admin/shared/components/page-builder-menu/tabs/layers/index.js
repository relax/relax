import * as pageBuilderActions from 'actions/page-builder';
import Component from 'components/component';
import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Layers from './layers';

@connect(
  (state) => ({
    hasTemplate: !!(state.pageBuilder.fragments.template),
    templateLinks: get(state.pageBuilder, ['fragments', 'template', 'doc', 'links'], null),
    type: state.pageBuilder.type
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class LayersTabContainer extends Component {
  static propTypes = {
    template: PropTypes.object,
    type: PropTypes.string,
    pageBuilderActions: PropTypes.object.isRequired
  };

  render () {
    return (
      <Layers
        {...this.props}
      />
    );
  }
}
