import Component from 'components/component';
import ModalInput from 'components/modal-input';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './provider.less';

export default class FontsProvider extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    valid: PropTypes.bool,
    placeholder: PropTypes.string
  };

  render () {
    const {value, onChange, valid, placeholder} = this.props;

    return (
      <div className={styles.inputArea}>
        <ModalInput
          invalid={!valid}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
