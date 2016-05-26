import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Entry extends Component {
  static fragments = {
    color: {
      _id: 1,
      label: 1,
      value: 1
    }
  };

  static propTypes = {
    color: PropTypes.object.isRequired,
    duplicateColor: PropTypes.func.isRequired,
    removeColor: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  @bind
  duplicate () {
    const {duplicateColor, color} = this.props;
    duplicateColor(color._id);
  }

  @bind
  remove () {
    const {removeColor, color} = this.props;
    removeColor(color._id);
  }

  @bind
  onClick () {
    const {onClick, color} = this.props;
    onClick(color);
  }

  render () {
    const {color} = this.props;
    const colorStyle = {
      backgroundColor: color.value
    };

    return (
      <div className={styles.root}>
        <div className={styles.btn} onClick={this.onClick}>
          <div className={cx(styles.color, color.value === '#ffffff' && styles.white)} style={colorStyle}></div>
          <div className={styles.info}>
            <div className={styles.title}>{color.label}</div>
            <div className={styles.value}>{color.value}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={this.duplicate}>Duplicate</button>
          <button className={cx(styles.button, styles.remove)} onClick={this.remove}>Delete Color</button>
        </div>
      </div>
    );
  }
}
