import React from 'react';
import {Component} from 'relax-framework';
import OptionsList from '../../options-list';
import FormState from '../../form-state';
import cx from 'classnames';

import {Types} from '../../../data-types';
import settingsActions from '../../../client/actions/settings';

export default class Settings extends Component {
  getInitialState () {
    return {
      settings: this.parseSettings(this.context.settings),
      state: false
    };
  }

  onChange (id, value) {
    this.state.settings[id] = value;

    this.setState({
      settings: this.state.settings
    });
  }

  outSuccess () {
    this.setState({
      state: false
    });
  }

  submit (event) {
    event.preventDefault();

    clearTimeout(this.successTimeout);
    this.setState({
      state: 'loading'
    });

    settingsActions
      .saveSettings(this.state.settings)
      .then(() => {
        this.setState({
          state: 'success'
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 3000);
      })
      .catch(() => {
        this.setState({
          state: 'error'
        });
      });
  }

  renderSaving () {
    let message = false;

    if (this.state.state === 'loading') {
      message = 'Saving changes';
    } else if (this.state.state === 'error') {
      message = 'Error saving changes';
    } else if (this.state.state === 'success') {
      message = 'Changes saved';
    }

    if (message !== false) {
      return (
        <FormState
          state={this.state.state}
          message={message}
        />
      );
    }
  }

  render () {
    return (
      <div>
        <div className='filter-menu'>
          <span className='admin-title'>General Settings</span>
        </div>
        <div className='admin-scrollable'>
          <div className='list white-options'>
            <OptionsList options={this.constructor.options} values={this.state.settings} onChange={this.onChange.bind(this)} />
            <a href='#' className={cx('button', 'button-primary', this.state.saving && 'disabled')} onClick={this.submit.bind(this)}>Submit changes</a>
            {this.renderSaving()}
          </div>
        </div>
      </div>
    );
  }
}

Settings.options = [
  {
    label: 'Site Title',
    type: Types.String,
    id: 'title',
    default: ''
  },
  {
    label: 'Favicon',
    type: Types.Image,
    id: 'favicon',
    props: {
      width: 50,
      height: 50
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

Settings.contextTypes = {
  settings: React.PropTypes.array.isRequired
};
