import Component from 'components/component';
import Portal from 'components/portal';
import Stick from 'components/stick';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';

import styles from './color.less';

export default class Color extends Component {
  static fragments = {
    color: {
      _id: 1,
      label: 1,
      value: 1
    }
  };

  static propTypes = {
    color: PropTypes.object.isRequired,
    selectColor: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  };

  getInitState () {
    return {
      overed: false
    };
  }

  @bind
  onClick () {
    this.props.selectColor(this.props.color._id);
  }

  @bind
  onMouseEnter () {
    this.setState({
      overed: true,
      element: findDOMNode(this)
    });
  }

  @bind
  onMouseLeave () {
    this.setState({
      overed: false
    });
  }

  render () {
    const {disabled, color} = this.props;
    const style = {
      backgroundColor: color.value
    };

    return (
      <div
        className={cx(styles.color, disabled && styles.disabled)}
        style={style}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderSelected()}
        {this.renderInfo()}
      </div>
    );
  }

  renderSelected () {
    const {selected} = this.props;

    if (selected) {
      return (
        <i className={cx(styles.selected, 'nc-icon-mini ui-1_check')} />
      );
    }
  }

  renderInfo () {
    const {color} = this.props;
    if (this.state.overed) {
      return (
        <Portal>
          <Stick
            element={this.state.element}
            verticalPosition='top'
            horizontalPosition='center'
            verticalOffset={3}
            className={styles.colorTitleBalloon}
          >
            <div className={styles.colorTitle}>
              <span className={styles.triangle} />
              <span className={styles.label}>{color.label}</span>
            </div>
          </Stick>
        </Portal>
      );
    }
  }
}
