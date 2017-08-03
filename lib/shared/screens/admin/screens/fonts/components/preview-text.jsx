import bind from 'decorators/bind';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './preview-text.less';

export default class PreviewText extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  @bind
  onChange (event) {
    this.props.onChange(event.target.value);
  }

  render () {
    const {value} = this.props;
    return (
      <input className={styles.root} value={value} onChange={this.onChange} placeholder='Preview Text' />
    );
  }
}
