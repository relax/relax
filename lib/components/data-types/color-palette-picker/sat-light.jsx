import Colr from 'colr';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import utils from '../../../utils';

export default class SatLight extends Component {

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
    const percY = utils.limitNumber((event.pageY - bounds.top) / bounds.height, 0, 1);
    const percX = utils.limitNumber((event.pageX - bounds.left) / bounds.width, 0, 1);

    this.props.hsvChange({
      h: this.props.hsv.h,
      s: percX * 100,
      v: 100 - percY * 100
    });
  }

  onMouseUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.componentWillUnmount();
  }

  render () {
    const {hsv} = this.props;
    const markerStyle = {
      top: (100 - hsv.v) + '%',
      left: hsv.s + '%'
    };
    const backStyle = {
      backgroundColor: Colr.fromHsv(hsv.h, 100, 100).toHex()
    };

    if (hsv.v > 50 && hsv.s < 50) {
      markerStyle.borderColor = '#000000';
    }

    return (
      <div className='sat-light' style={backStyle} onMouseDown={::this.onMouseDown} >
        <span className='border' />
        <span className='marker' style={markerStyle} />
      </div>
    );
  }
}
