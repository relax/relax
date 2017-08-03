import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './icon-picker.less';
import IconSelector from './icon-selector';

export default class IconPicker extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    selector: PropTypes.bool.isRequired,
    openSelector: PropTypes.func.isRequired,
    closeSelector: PropTypes.func.isRequired,
    white: PropTypes.bool
  };

  render () {
    const {openSelector, white} = this.props;

    return (
      <div className={cx(styles.root, white && styles.white)} onClick={openSelector}>
        {this.renderSelected()}
        {this.renderSelector()}
      </div>
    );
  }

  renderSelected () {
    const {value} = this.props;

    let result;
    if (value && value.family) {
      result = (
        <div className={styles.selected}>
          <i className={value.className}>
            {value.content}
          </i>
        </div>
      );
    } else {
      result = <div className={styles.none}>No icon selected</div>;
    }
    return result;
  }

  renderSelector () {
    if (this.props.selector) {
      const {value, closeSelector, onChange} = this.props;
      return (
        <IconSelector
          value={value}
          onClose={closeSelector}
          onChange={onChange}
        />
      );
    }
  }
}
