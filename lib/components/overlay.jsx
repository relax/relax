import React from 'react';
import {Component} from 'relax-framework';
import Animate from './animate';
import cx from 'classnames';

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
      <div className={cx('big-overlay', this.props.switch && 'switched')}>
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

Overlay.propTypes = {
  transition: React.PropTypes.string,
  closable: React.PropTypes.bool,
  switch: React.PropTypes.bool
};

Overlay.defaultProps = {
  transition: 'slideUpIn',
  closable: true,
  switch: false
};
