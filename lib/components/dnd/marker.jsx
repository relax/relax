import cx from 'classnames';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import utils from '../../utils';

export default class Marker extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    report: PropTypes.object.isRequired,
    active: PropTypes.bool,
    orientation: PropTypes.string
  }

  getInitState () {
    return {
      visible: false
    };
  }

  componentDidMount () {
    this.onMouseMoveListener = ::this.onMouseMove;
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  componentWillUnmount () {
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    const elementOffset = utils.getOffsetRect(findDOMNode(this));
    const distance = Math.abs(elementOffset.top - event.pageY);

    if (distance < 100 && !this.state.visible) {
      this.setState({
        visible: true
      });
      document.removeEventListener('mousemove', this.onMouseMoveListener);
    }
  }

  onMouseEnter () {
    const {onDroppable} = this.props.dndActions;
    onDroppable(this.props.report, this.props.orientation);
  }

  onMouseLeave () {
    const {outDroppable} = this.props.dndActions;
    outDroppable(this.props.report.id);
  }

  render () {
    const {orientation} = this.props;

    return (
      <div
        className={cx('dnd-marker', this.props.active && 'active', orientation, this.state.visible && 'visible')}
        onMouseEnter={::this.onMouseEnter}
        onMouseLeave={::this.onMouseLeave}
      />
    );
  }
}
