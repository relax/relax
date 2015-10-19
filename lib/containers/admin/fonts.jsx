import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as fontsActions from '../../client/actions/fonts';
import Fonts from '../../components/admin/panels/fonts';

@connect(
  (state) => ({
    fonts: state.fonts.data
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch)
)
export default class SettingsContainer extends Component {
  static fragments = Fonts.fragments

  static propTypes = {
    settings: PropTypes.object.isRequired,
    changeSettingValue: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      state: false
    };
  }

  static settings = Fonts.settings

  static panelSettings = {
    activePanelType: 'fonts',
    breadcrumbs: [
      {
        label: 'Fonts'
      }
    ]
  }

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
