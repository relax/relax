import classNames from 'classnames';
import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import React from 'react';
import Spinner from 'components/spinner';

import styles from './index.less';

export default class Input extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    password: React.PropTypes.bool,
    state: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    focused: React.PropTypes.bool
  };

  componentDidMount () {
    if (this.props.focused) {
      this.refs.input.focus();
    }
  }

  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    const {disabled, className, state, password} = this.props;
    return (
      <div className={classNames(styles.input, disabled && styles.disabled, className, state && styles.withState)}>
        <input
          type={password ? 'password' : 'text'}
          value={this.props.value}
          disabled={this.props.disabled}
          onChange={::this.onChange}
          ref='input'
          placeholder={this.props.placeholder || ''}
        />
        {this.renderState()}
      </div>
    );
  }

  renderState () {
    const {state} = this.props;
    if (state) {
      if (state === 'valid') {
        return (
          <Animate transition='fadeIn' key='valid'>
            <div className={cx(styles.state, styles.valid)}>
              <i className={cx(styles.stateContent, 'nc-icon-mini ui-1_check')}></i>
            </div>
          </Animate>
        );
      } else if (state === 'invalid') {
        return (
          <Animate transition='fadeIn' key='invalid'>
            <div className={cx(styles.state, styles.invalid)}>
              <i className={cx(styles.stateContent, 'nc-icon-mini ui-1_simple-remove')}></i>
            </div>
          </Animate>
        );
      } else if (state === 'loading') {
        return (
          <Animate transition='fadeIn' key='loading'>
            <div className={styles.state}>
              <div className={styles.stateContent}>
                <Spinner />
              </div>
            </div>
          </Animate>
        );
      }
    }
  }
}
