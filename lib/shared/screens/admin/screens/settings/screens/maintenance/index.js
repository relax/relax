import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';

const options = [
  {
    label: 'Maintenance Mode',
    description: `When Maintenance Mode is enabled,
        the site will be inaccessible to non-admin users.
        Admins will still be able to view all pages of the website once logged in.`,
    type: 'Boolean',
    id: 'maintenanceMode',
    default: false
  }
];

export default class MaintenanceSettingsContainer extends Component {
  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
