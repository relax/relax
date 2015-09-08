import React from 'react';
import {Component} from 'relax-framework';
import Animate from './animate';

export default class Overlay extends Component {
  renderClose () {
    if (this.props.closable) {
      return (
        <div className='close-button' onClick={this.context.closeOverlay}>
          <i className='material-icons'>close</i>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='big-overlay'>
        <Animate transition='fadeIn'>
          <div className='background'></div>
        </Animate>
        <Animate transition={this.props.transition}>
          <div className='content'>
            {this.props.children}
          </div>
        </Animate>
        {this.renderClose()}
      </div>
    );
  }
}

Overlay.contextTypes = {
  closeOverlay: React.PropTypes.func.isRequired
};

Overlay.defaultProps = {
  transition: React.PropTypes.string,
  closable: React.PropTypes.bool
};

Overlay.defaultProps = {
  transition: 'slideUpIn',
  closable: true
};
