import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import styles from './index.less';

export default class ModalInput extends Component {
  static propTypes = {
    invalid: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    focus: PropTypes.bool,
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'text'
  };

  componentDidMount () {
    if (this.props.focus) {
      findDOMNode(this).focus();
    }
  }

  @bind
  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    const {placeholder, value, invalid, type} = this.props;
    const validable = typeof invalid !== 'undefined' && value;
    return (
      <label className={cx(
          styles.holder,
          validable && invalid && styles.invalid
        )}
      >
        <input
          type={type}
          className={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {validable && this.renderState()}
      </label>
    );
  }

  renderState () {
    const {invalid} = this.props;
    return (
      <Animate key={invalid ? 'invalid' : 'valid'}>
        <i className={cx(
            styles.icon,
            invalid && styles.invalidIco,
            'nc-icon-mini',
            invalid ? 'ui-1_simple-remove' : 'ui-1_check'
          )}
        />
      </Animate>
    );
  }
}
