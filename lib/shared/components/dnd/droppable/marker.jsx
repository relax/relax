import cx from 'classnames';
import utils from 'helpers/utils';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './marker.less';

export default class Marker extends Component {
  static propTypes = {
    dndActions: PropTypes.object.isRequired,
    report: PropTypes.object.isRequired,
    active: PropTypes.bool,
    orientation: PropTypes.string
  };

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
    const {orientation, active} = this.props;

    return (
      <div
        className={cx(styles.marker, active && styles.active, styles[orientation], this.state.visible && styles.visible)}
        onMouseEnter={::this.onMouseEnter}
        onMouseLeave={::this.onMouseLeave}
      />
    );
  }
}
