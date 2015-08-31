import {Component} from 'relax-framework';
import React from 'react';
import classNames from 'classnames';
import Animate from './animate';

export default class Lightbox extends Component {

  close (event) {
    event.preventDefault();

    if(this.props.onClose){
      this.props.onClose();
    }
  }

  renderHeader () {
    if (this.props.header) {
      return (
        <div className='lightbox-header'>
          <h3 className='lightbox-title'>{this.props.title}</h3>
          <a href='#' onClick={this.close.bind(this)} className='lightbox-close'><i className='fa fa-close'></i></a>
        </div>
      );
    }
  }

  render () {
    return (
      <div className={classNames('lightbox', 'white-options', this.props.className)}>
        <Animate transition='fadeIn'>
          <div className='lightbox-background'></div>
        </Animate>
        <Animate>
          <div className='animation-holder'>
            <div className='lightbox-wrapper' ref='wrapper'>
              {this.renderHeader()}
              <div className='lightbox-content'>
                {this.props.children}
              </div>
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}

Lightbox.propTypes = {
  onClose: React.PropTypes.func,
  title: React.PropTypes.string,
  header: React.PropTypes.bool
};

Lightbox.defaultProps = {
  title: '',
  header: true
};
