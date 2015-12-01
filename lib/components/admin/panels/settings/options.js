import {Types} from '../../../../data-types';

export default [
  {
    label: 'Site Title',
    type: Types.String,
    id: 'title',
    default: ''
  },
  {
    label: 'Frontpage',
    type: Types.PagePicker,
    id: 'frontpage'
  },
  {
    label: 'Favicon',
    type: Types.Image,
    id: 'favicon',
    props: {
      width: 50,
      height: 50,
      type: 'favicon'
    }
  },
  {
    label: 'Webclip',
    type: Types.Image,
    id: 'webclip',
    props: {
      width: 114,
      height: 114
    }
  },
  {
    label: 'Google analytics tracking ID',
    type: Types.String,
    id: 'googleAnalytics',
    props: {
      placeholder: 'UA-XXXXX-Y'
    }
  },
  {
    label: 'Mail service',
    type: Types.Select,
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
    type: Types.String,
    id: 'mailUser'
  },
  {
    label: 'Mail user password',
    type: Types.String,
    id: 'mailPass',
    props: {
      password: true
    }
  },
  {
    label: 'Send emails to',
    type: Types.String,
    id: 'mailTo'
  }
];
