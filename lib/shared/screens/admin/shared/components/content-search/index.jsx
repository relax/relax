import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './index.less';

export default class ContentSearch extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    focused: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string
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
    const {value, className, inputClassName} = this.props;

    return (
      <label className={cx(styles.root, className)}>
        <i className='nc-icon-outline ui-1_zoom'></i>
        <input
          className={cx(styles.input, inputClassName)}
          type='text'
          value={value}
          placeholder='Search'
          onChange={this.onChange}
          ref='input'
        />
      </label>
    );
  }
}
