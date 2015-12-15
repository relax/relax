import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import utils from '../../../utils';

export default class Hue extends Component {

  static propTypes = {
    colr: PropTypes.object.isRequired,
    hsv: PropTypes.object.isRequired,
    hsvChange: PropTypes.func.isRequired
  }

  constructor (props, children) {
    super(props, children);
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
  }

  componentWillUnmount () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseDown (event) {
    event.preventDefault();
    event.stopPropagation();

    this.onMouseMove(event);

    document.addEventListener('mouseup', this.onMouseUpListener);
    document.addEventListener('mousemove', this.onMouseMoveListener);
  }

  onMouseMove (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(findDOMNode(this));
    const perc = utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1);

    this.props.hsvChange({
      h: perc * 360,
      s: this.props.hsv.s,
      v: this.props.hsv.v
    });
  }

  onMouseUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.componentWillUnmount();
  }

  render () {
    const {hsv} = this.props;
    const perc = (hsv.h / 360 * 100);
    const markerStyle = {
      top: perc + '%',
      transform: `translate(-50%, ${-perc}%)`
    };

    return (
      <div className='hue' onMouseDown={::this.onMouseDown}>
        <span className='marker' style={markerStyle} />
      </div>
    );
  }
}
