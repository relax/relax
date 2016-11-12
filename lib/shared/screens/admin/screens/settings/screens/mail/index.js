import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';
import mapSettingsIds from 'helpers/map-settings-ids';

const options = [
  {
    label: 'Mail Service',
    type: 'String',
    id: 'mailService',
    description: `Reference a valid service from nodemailer-wellknown
      to use as a mail sender service.`,
    default: ''
  },
  {
    label: 'Username',
    type: 'String',
    id: 'mailUser',
    default: ''
  },
  {
    label: 'Password',
    type: 'String',
    id: 'mailPass',
    default: ''
  },
  {
    label: 'Sender Email',
    type: 'String',
    id: 'mailFrom',
    default: '',
    description: `This is the email address relax will
      send emails from.`
  }
];

export default class MailSettingsContainer extends Component {
  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={mapSettingsIds(options)} />
      </Content>
    );
  }
}
