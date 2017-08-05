import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import DisplayButton from './button';

export default class CssDisplayOption extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onChange (value) {
    const {onChange} = this.props;
    onChange(value);
  }

  render () {
    const {value} = this.props;

    return (
      <div>
        <DisplayButton
          value=''
          onChange={this.onChange}
          label='Initial'
          active={!value}
        >
          <i className='nc-icon-outline ui-1_eye-19' />
        </DisplayButton>
        <DisplayButton
          value='none'
          onChange={this.onChange}
          label='Hidden'
          active={value === 'none'}
        >
          <i className='nc-icon-outline ui-1_eye-ban-20' />
        </DisplayButton>
      </div>
    );
  }
}
