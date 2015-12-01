import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Utils from '../../utils';

export default class Focus extends Component {
  static propTypes = {
    elementId: PropTypes.string.isRequired
  }

  getInitState () {
    return {
      dom: document.getElementById(this.props.elementId)
    };
  }

  componentDidMount () {
    this.updateBind = ::this.update;
    window.addEventListener('resize', this.updateBind);
    window.addEventListener('scroll', this.updateBind);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.elementId !== this.props.elementId;
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBind);
    window.removeEventListener('scroll', this.updateBind);
  }

  update () {
    this.forceUpdate();
  }

  render () {
    const style = {
      zIndex: 8,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    };

    const rect = Utils.getOffsetRect(this.state.dom);
    const width = window.outerWidth;
    const height = window.outerHeight;
    const points = `0,0 ${width},0 ${width},${height} 0,${height} ${rect.left},${rect.top + rect.height} ${rect.left + rect.width},${rect.top + rect.height} ${rect.left + rect.width},${rect.top} ${rect.left},${rect.top} ${rect.left},${rect.top + rect.height} 0,${height} 0,0`;

    return (
      <svg style={style}>
        <polygon points={points} style={{
          fill: 'black',
          opacity: '0.7',
          pointerEvents: 'initial'
        }} />
      </svg>
    );
  }
}
