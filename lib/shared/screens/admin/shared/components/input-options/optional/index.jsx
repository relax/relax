import Component from 'components/component';
import React from 'react';

import styles from './index.less';

export default class Optional extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired
  };

  toggle (event) {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render () {
    return (
      <div className={styles.root} onClick={::this.toggle}>
        <span className={styles.label}>{this.props.label}</span>
        <span className={styles.box}>
          {this.props.value && <i className='nc-icon-mini ui-1_check'></i>}
        </span>
      </div>
    );
  }
}
