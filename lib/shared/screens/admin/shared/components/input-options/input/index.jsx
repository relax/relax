import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    password: PropTypes.bool,
    state: PropTypes.string,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    white: PropTypes.bool
  };

  componentDidMount () {
    if (this.props.focused) {
      this.refs.input.focus();
    }
  }

  @bind
  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    const {disabled, className, state, password, white} = this.props;
    return (
      <div className={cx(
          styles.input,
          white && styles.white,
          disabled && styles.disabled,
          className,
          state && styles.withState
        )}
      >
        <input
          type={password ? 'password' : 'text'}
          value={this.props.value}
          disabled={this.props.disabled}
          onChange={this.onChange}
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
