import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cx from 'classnames';

import OptionsList from '../../../options-list';
import FormState from '../../../form-state';
import options from './options';

import * as settingsActions from '../../../../actions/settings';

@connect(
  (state) => ({
    settings: state.settings.data
  }),
  (dispatch) => bindActionCreators(settingsActions, dispatch)
)
export default class Settings extends Component {
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  }

  static settings = [
    'title',
    'url',
    'favicon',
    'webclip',
    'googleAnalytics',
    'mailService',
    'mailUser',
    'mailPass',
    'mailTo'
  ]

  static propTypes = {
    settings: PropTypes.object.isRequired,
    changeSettingValue: PropTypes.func.isRequired,
    saveSettings: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      state: false
    };
  }

  onChange (id, value) {
    this.props.changeSettingValue(id, value);
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

    this.props.saveSettings(this.constructor.fragments, this.props.settings)
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

  render () {
    return (
      <div>
        <div className='filter-menu'>
          <span className='admin-title'>General Settings</span>
        </div>
        <div className='admin-scrollable'>
          <div className='list white-options'>
            <OptionsList options={options} values={this.props.settings} onChange={this.onChange.bind(this)} />
            <a href='#' className={cx('button', 'button-primary', this.state.saving && 'disabled')} onClick={this.submit.bind(this)}>Submit changes</a>
            {this.renderSaving()}
          </div>
        </div>
      </div>
    );
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
}
