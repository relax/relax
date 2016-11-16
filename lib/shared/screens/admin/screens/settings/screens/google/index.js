import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';
import {googleAPI} from 'helpers/const/setting-keys';

const options = [
  {
    label: 'Google API ID',
    type: 'String',
    id: googleAPI,
    props: {
      placeholder: 'Your google API ID'
    }
  }
];

export default class GoogleSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
