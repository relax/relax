import bind from 'decorators/bind';
import Component from 'components/component';
import Overrides from 'components/override-status';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Optional extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    elementOverride: PropTypes.bool,
    displayOverride: PropTypes.bool
  };

  @bind
  toggle (event) {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render () {
    return (
      <div className={styles.root} onClick={this.toggle}>
        <span className={styles.label}>
          {this.props.label}
        </span>
        {this.renderOverrides()}
        <span className={styles.box}>
          {this.props.value && <i className='nc-icon-mini ui-1_check'></i>}
        </span>
      </div>
    );
  }

  renderOverrides () {
    const {elementOverride, displayOverride} = this.props;

    if (elementOverride || displayOverride) {
      return (
        <Overrides
          elementOverride={elementOverride}
          displayOverride={displayOverride}
          onChange={this.onChange}
        />
      );
    }
  }
}
