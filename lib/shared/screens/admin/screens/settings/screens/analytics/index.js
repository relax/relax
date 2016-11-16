import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';
import {googleAnalytics} from 'helpers/const/setting-keys';
const options = [
  {
    label: 'Google analytics tracking ID',
    type: 'String',
    id: googleAnalytics,
    props: {
      placeholder: 'UA-XXXXX-Y'
    }
  }
];

export default class AnalyticsSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
