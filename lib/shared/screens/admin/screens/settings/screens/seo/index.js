import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';
import {
  description,
  copyright,
  keywords,
  robots,
  dctitle
} from 'helpers/const/setting-keys';

const options = [
  {
    label: 'Site Description',
    type: 'String',
    id: description,
    description: `This sets the description for the website that
      you would usually see in search engines.
      This should be no longer than 155 characters`,
    default: ''
  },
  {
    label: 'Copyright',
    type: 'String',
    id: copyright,
    default: ''
  },
  {
    label: 'Keywords',
    type: 'String',
    id: keywords,
    default: ''
  },
  {
    label: 'Robots',
    type: 'String',
    id: robots,
    default: ''
  },
  {
    label: 'DC Title',
    type: 'String',
    id: dctitle,
    default: ''
  }
];

export default class SEOSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
