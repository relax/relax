import 'styles/icons/font-awesome/index.less';
import 'styles/icons/google-icons/index.less';
import 'styles/icons/nucleo/index.less';
import 'styles/normalize.less';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {loadFonts} from 'actions/fonts';
import {toggleEditing} from 'actions/page-builder';
import {bindActionCreators} from 'redux';
import {rootDataConnect, dataConnect} from 'relate-js';

import Admin from './components/admin';

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

  init () {
    this.fontsInit = false;
  }

  componentWillReceiveProps (nextProps) {
    if (!this.fontsInit && this.props.fonts !== nextProps.fonts) {
      this.fontsInit = true;
      this.props.loadFonts();
    }
  }

  render () {
    return (
      <Admin {...this.props}>
        {this.props.children}
      </Admin>
    );
  }
}
