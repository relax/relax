import * as settingsActions from 'actions/settings';

import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import SettingsForm from './form';

@dataConnect(
  (state) => ({
    values: state.settings
  }),
  (dispatch) => bindActionCreators(settingsActions, dispatch),
  (props) => ({
    fragments: {
      settings: {
        _id: 1,
        value: 1
      }
    },
    variablesTypes: {
      settings: {
        ids: '[String]'
      }
    },
    initialVariables: {
      settings: {
        ids: props.settingsIds
      }
    }
  })
)
export default class SettingsFormContainer extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    settingsIds: PropTypes.array.isRequired,
    saveSettings: PropTypes.func.isRequired
  };

  @bind
  onSubmit () {
    const {saveSettings, settingsIds} = this.props;
    saveSettings(settingsIds);
  }

  render () {
    const {options, values, loading, changeSettingValue} = this.props;
    return (
      <SettingsForm
        options={options}
        values={values}
        loading={loading}
        onChange={changeSettingValue}
        onSubmit={this.onSubmit}
        saving={values.saving}
        saved={values.saved}
      />
    );
  }
}
