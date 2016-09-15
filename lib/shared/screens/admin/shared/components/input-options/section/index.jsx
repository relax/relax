import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';

import styles from './index.less';

export default class Section extends Component {
  static propTypes = {
    value: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  @bind
  toggle (event) {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  }

  render () {
    const {value, label} = this.props;
    return (
      <div className={styles.root} onClick={this.toggle}>
        <i
          className={cx(
            'nc-icon-mini',
            value ? 'arrows-1_minimal-down' : 'arrows-1_minimal-right'
          )}
        />
        <span>{label}</span>
      </div>
    );
  }
}
