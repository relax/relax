import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './font.less';

export default class CustomFont extends Component {
  static propTypes = {
    name: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isNew: PropTypes.bool
  };

  @bind
  onRemove () {
    const {index, onRemove} = this.props;
    onRemove(index);
  }

  render () {
    const {name, isNew} = this.props;

    return (
      <div className={cx(styles.root, isNew && styles.new)}>
        <div className={styles.remove} onClick={this.onRemove}>Remove</div>
        <div className={styles.name}>{name}</div>
      </div>
    );
  }
}
