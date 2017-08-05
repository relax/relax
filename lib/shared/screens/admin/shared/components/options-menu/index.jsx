import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class OptionsMenu extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    style: PropTypes.object
  };

  render () {
    return (
      <div className={styles.root} style={this.props.style}>
        {this.props.options.map(this.renderOption, this)}
      </div>
    );
  }

  renderOption (option, key) {
    return (
      <button className={styles.button} onClick={option.action || 'return false;'} key={key}>
        {option.icon && <i className={option.icon}></i>}
        {option.label}
      </button>
    );
  }
}
