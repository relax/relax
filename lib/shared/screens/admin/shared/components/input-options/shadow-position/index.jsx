import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ShadowPosition extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onClick (to) {
    this.props.onChange(to);
  }

  render () {
    const {value} = this.props;
    return (
      <div className={styles.root}>
        <button className={cx(styles.outset, value === 'outset' && styles.active)} onClick={this.onClick.bind(this, 'outset')} />
        <button className={cx(styles.inset, value === 'inset' && styles.active)} onClick={this.onClick.bind(this, 'inset')} />
      </div>
    );
  }
}
