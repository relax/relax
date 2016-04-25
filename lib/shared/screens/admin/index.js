import 'styles/normalize.less';
import 'styles/nucleo/index.less';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {toggleEditing} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {rootDataConnect} from 'relate-js';

import Admin from './components/admin';

@rootDataConnect()
@connect(
  (state) => ({
    previewing: !state.pageBuilder.editing
  }),
  (dispatch) => bindActionCreators({toggleEditing}, dispatch)
)
export default class AdminContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <Admin {...this.props}>
        {this.props.children}
      </Admin>
    );
  }
}
