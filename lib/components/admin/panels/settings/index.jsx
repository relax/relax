import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import options from './options';
import FormState from '../../../form-state';
import OptionsList from '../../../options-list';

export default class Settings extends Component {
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    changeSettingValue: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    state: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static settings = [
    'title',
    'frontpage',
    'favicon',
    'webclip',
    'googleAnalytics',
    'mailService',
    'mailUser',
    'mailPass',
    'mailTo'
  ]

  render () {
    return (
      <div>
        <div className='filter-menu'>
          <span className='admin-title'>General Settings</span>
        </div>
        <div className='admin-scrollable'>
          <div className='list white-options'>
            <OptionsList options={options} values={this.props.settings} onChange={this.props.onChange} />
            <a
              href='#'
              className={cx('button', 'button-primary', this.props.saving && 'disabled')}
              onClick={this.props.onSubmit}>
              Submit changes
            </a>
            {this.renderSaving()}
          </div>
        </div>
      </div>
    );
  }

  renderSaving () {
    let message = false;

    if (this.props.state === 'loading') {
      message = 'Saving changes';
    } else if (this.props.state === 'error') {
      message = 'Error saving changes';
    } else if (this.props.state === 'success') {
      message = 'Changes saved';
    }

    if (message !== false) {
      return (
        <FormState
          state={this.props.state}
          message={message}
        />
      );
    }
  }
}
