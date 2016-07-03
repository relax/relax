import Component from 'components/component';
import Content from 'components/content';
import React from 'react';
import SettingsForm from 'components/settings-form';

const options = [
  {
    label: 'Mail service',
    type: 'Select',
    id: 'mailService',
    props: {
      values: [
        '1und1',
        'AOL',
        'DebugMail.io',
        'DynectEmail',
        'FastMail',
        'GandiMail',
        'Gmail',
        'Godaddy',
        'GodaddyAsia',
        'GodaddyEurope',
        'hot.ee',
        'Hotmail',
        'iCloud',
        'mail.ee',
        'Mail.ru',
        'Mailgun',
        'Mailjet',
        'Mandrill',
        'Naver',
        'Postmark',
        'QQ',
        'QQex',
        'SendCloud',
        'SendGrid',
        'SES',
        'Sparkpost',
        'Yahoo',
        'Yandex',
        'Zoho'
      ]
    }
  },
  {
    label: 'Mail user/email',
    type: 'String',
    id: 'mailUser'
  },
  {
    label: 'Mail user password',
    type: 'String',
    id: 'mailPass',
    props: {
      password: true
    }
  },
  {
    label: 'Send emails to',
    type: 'String',
    id: 'mailTo'
  }
];

const settingsIds = ['mailService', 'mailUser', 'mailPass', 'mailTo'];

export default class EmailSettingsContainer extends Component {
  static propTypes = {};

  render () {
    return (
      <Content noOffset>
        <SettingsForm options={options} settingsIds={settingsIds} />
      </Content>
    );
  }
}
