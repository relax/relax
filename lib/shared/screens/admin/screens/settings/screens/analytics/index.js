import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';

const options = [
  {
    label: 'Google analytics tracking ID',
    type: 'String',
    id: 'googleAnalytics',
    props: {
      placeholder: 'UA-XXXXX-Y'
    }
  }
];

const settingsIds = ['googleAnalytics'];

export default class AnalyticsSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={settingsIds} />
      </Content>
    );
  }
}
