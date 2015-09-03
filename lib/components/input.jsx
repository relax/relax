import {Component} from 'relax-framework';
import React from 'react';
import classNames from 'classnames';

import Animate from './animate';
import Spinner from './spinner';

export default class Input extends Component {

  onChange (event) {
    this.props.onChange(event.target.value);
  }

  renderState () {
    if (this.props.state) {
      if (this.props.state === 'valid') {
        return (
          <Animate transition='fadeIn' key='valid'>
            <div className='state valid'>
              <i className='material-icons'>check</i>
            </div>
          </Animate>
        );
      } else if (this.props.state === 'invalid') {
        return (
          <Animate transition='fadeIn' key='invalid'>
            <div className='state invalid'>
              <i className='material-icons'>close</i>
            </div>
          </Animate>
        );
      } else if (this.props.state === 'loading') {
        return (
          <Animate transition='fadeIn' key='loading'>
            <div className='state'>
              <div>
                <Spinner />
              </div>
            </div>
          </Animate>
        );
      }
    }
  }

  render () {
    return (
      <div className={classNames('input', this.props.disabled && 'disabled', this.props.className)}>
        <input type={this.props.password ? 'password' : 'text'} value={this.props.value} disabled={this.props.disabled} onChange={this.onChange.bind(this)} ref='input' placeholder={this.props.placeholder || ''} />
        {this.renderState()}
      </div>
    );
  }
}

Input.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  password: React.PropTypes.bool,
  state: React.PropTypes.string
};
