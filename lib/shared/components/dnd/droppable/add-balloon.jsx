import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import styles from './add-balloon.less';

export default class AddBalloon extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    active: PropTypes.bool,
    position: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  };

  @bind
  onClick () {
    const {onClick, position} = this.props;
    onClick(position, findDOMNode(this.refs.marker));
  }

  render () {
    const {vertical, active} = this.props;
    return (
      <div
        className={cx(
          styles.root,
          vertical && styles.vertical,
          !vertical && this.state.closeToMargin && styles.inverted,
          active && styles.active
        )}
        onClick={this.onClick}
      >
        <span className={styles.marker} ref='marker'>
          <span className={styles.triangle}></span>
          <span className={styles.circle}>
            <i className='nc-icon-mini ui-1_simple-add'></i>
          </span>
        </span>
      </div>
    );
  }
}
