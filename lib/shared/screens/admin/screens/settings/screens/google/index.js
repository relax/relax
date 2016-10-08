import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';

const options = [
  {
    label: 'Google API ID',
    type: 'String',
    id: 'googleAPI',
    props: {
      placeholder: 'Your google API ID'
    }
  }
];

const settingsIds = ['googleAPI'];

export default class GoogleSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={settingsIds} />
      </Content>
    );
  }
}
