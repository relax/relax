import * as settingsActions from '../../client/actions/settings';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Settings from '../../components/admin/panels/settings';

@connect(
  (state) => ({
    settings: state.settings.data
  }),
  (dispatch) => bindActionCreators(settingsActions, dispatch)
)
export default class SettingsContainer extends Component {
  static fragments = Settings.fragments

  static panelSettings = {
    activePanelType: 'settings',
    breadcrumbs: [
      {
        label: 'Settings'
      }
    ]
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    changeSettingValue: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired
  }

  static settings = Settings.settings

  getInitState () {
    return {
      state: false
    };
  }

  onChange (id, value) {
    this.props.changeSettingValue(id, value);
  }

  onOutSuccess () {
    this.setState({
      state: false
    });
  }

  onSubmit (event) {
    event.preventDefault();

    clearTimeout(this.successTimeout);
    this.setState({
      state: 'loading'
    });

    this.props.saveSettings(this.constructor.fragments, this.props.settings)
      .then(() => {
        this.setState({
          state: 'success'
        });
        this.successTimeout = setTimeout(::this.onOutSuccess, 3000);
      })
      .catch(() => {
        this.setState({
          state: 'error'
        });
      });
  }

  render () {
    return (
      <Settings
        {...this.props}
        {...this.state}
        onChange={::this.onChange}
        onSubmit={::this.onSubmit}
      />
    );
  }
}
