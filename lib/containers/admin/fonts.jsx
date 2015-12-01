import * as fontsActions from '../../client/actions/fonts';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Fonts from '../../components/admin/panels/fonts';

@connect(
  (state) => ({
    fonts: state.fonts.data
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class SettingsContainer extends Component {
  static fragments = Fonts.fragments

  static panelSettings = {
    activePanelType: 'fonts',
    breadcrumbs: [
      {
        label: 'Fonts'
      }
    ]
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    changeSettingValue: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      state: false
    };
  }

  static settings = Fonts.settings

  onChange (id, value) {
    this.props.changeSettingValue(id, value);
  }

  render () {
    return (
      <Fonts
        {...this.props}
        {...this.state}
        onChange={::this.onChange}
      />
    );
  }
}
