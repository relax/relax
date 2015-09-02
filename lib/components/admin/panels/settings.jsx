import Animate from '../../animate';
import React from 'react';
import {Component} from 'relax-framework';
import OptionsList from '../../options-list';
import Spinner from '../../spinner';
import cx from 'classnames';

import {Types} from '../../../data-types';
import settingsActions from '../../../client/actions/settings';

export default class Settings extends Component {
  getInitialState () {
    return {
      settings: this.parseSettings(this.context.settings),
      saving: false
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
      success: false
    });
  }

  submit (event) {
    event.preventDefault();

    clearTimeout(this.successTimeout);
    this.setState({
      saving: true
    });

    settingsActions
      .saveSettings(this.state.settings)
      .then(() => {
        this.setState({
          saving: false,
          success: true
        });
        this.successTimeout = setTimeout(this.outSuccess.bind(this), 3000);
      });
  }

  renderSaving () {
    if (this.state.saving) {
      return (
        <Animate>
          <div className='saving-info'>
            <Spinner />
            <span>Saving changes</span>
          </div>
        </Animate>
      );
    } else if (this.state.success) {
      return (
        <Animate>
          <div className='saving-info'>
            <i className='material-icons'>check</i>
            <span>Saved successfuly</span>
          </div>
        </Animate>
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
  }
];

Settings.contextTypes = {
  settings: React.PropTypes.array.isRequired
};
