import React from 'react';
import {Component} from 'relax';
import Animate from './animate';

export default class Overlay extends Component {
  render () {
    return (
      <div className='big-overlay'>
        <Animate transition='fadeIn'>
          <div className='background'></div>
        </Animate>
        <Animate transition='slideUpIn'>
          <div className='content'>
            {this.props.children}
          </div>
        </Animate>
        <div className='close-button' onClick={this.context.closeOverlay}>
          <i className='material-icons'>close</i>
        </div>
      </div>
    );
  }
}

Overlay.contextTypes = {
  closeOverlay: React.PropTypes.func.isRequired
};
