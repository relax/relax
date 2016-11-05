import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';

const options = [
  {
    label: 'Site Description',
    type: 'String',
    id: 'description',
    default: ''
  },
  {
    label: 'Copyright',
    type: 'String',
    id: 'copyright',
    default: ''
  },
  {
    label: 'Keywords',
    type: 'String',
    id: 'keywords',
    default: ''
  },
  {
    label: 'Robots',
    type: 'String',
    id: 'robots',
    default: ''
  },
  {
    label: 'DC Title',
    type: 'String',
    id: 'dctitle',
    default: ''
  }
];

const settingsIds = ['description', 'keywords', 'copyright', 'robots', 'dctitle'];

export default class SEOSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={settingsIds} />
      </Content>
    );
  }
}
