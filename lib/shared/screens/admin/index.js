import 'styles/icons/font-awesome/index.less';
import 'styles/icons/google-icons/index.less';
import 'styles/normalize.less';

import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect, rootDataConnect} from 'relate-js';
import {loadFonts} from 'actions/fonts';
import {toggleEditing} from 'actions/page-builder';

import Admin from './components/admin';
import SaveStatus from './components/save-status';

@rootDataConnect()
@dataConnect(
  (state) => ({
    previewing: !state.pageBuilder.editing,
    fonts: state.fonts
  }),
  (dispatch) => bindActionCreators({toggleEditing, loadFonts}, dispatch),
  () => ({
    fragments: {
      settings: {
        _id: 1,
        value: 1
      }
    },
    variablesTypes: {
      settings: {
        ids: '[String]!'
      }
    },
    initialVariables: {
      settings: {
        ids: ['fonts']
      }
    }
  })
)
export default class AdminContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fonts: PropTypes.object.isRequired,
    loadFonts: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.loadFonts();
  }

  render () {
    return (
      <Admin {...this.props}>
        {this.props.children}
        <SaveStatus />
      </Admin>
    );
  }
}
