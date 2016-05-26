import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';
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
    return (
      <input
        type={type}
        className={cx(styles.input, invalid === true && styles.invalid, invalid === false && styles.valid)}
        value={value}
        placeholder={placeholder}
        onChange={this.onChange}
      />
  );
  }
}
