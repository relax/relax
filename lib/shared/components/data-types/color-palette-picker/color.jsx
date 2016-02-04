import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import Portal from '../../portal';
import Stick from '../../stick';

export default class Color extends Component {
  static fragments = {
    color: {
      _id: 1,
      label: 1,
      value: 1
    }
  }

  static propTypes = {
    color: PropTypes.object.isRequired,
    selectColor: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      overed: false
    };
  }

  onClick () {
    this.props.selectColor(this.props.color._id);
  }

  onMouseEnter () {
    this.setState({
      overed: true,
      element: findDOMNode(this)
    });
  }

  onMouseLeave () {
    this.setState({
      overed: false
    });
  }

  render () {
    const style = {
      backgroundColor: this.props.color.value
    };

    return (
      <div className='color' style={style} onClick={::this.onClick} onMouseEnter={::this.onMouseEnter} onMouseLeave={::this.onMouseLeave}>
        {this.renderInfo()}
      </div>
    );
  }

  renderInfo () {
    const {color} = this.props;
    if (this.state.overed) {
      return (
        <Portal>
          <Stick element={this.state.element} verticalPosition='top' horizontalPosition='center' verticalOffset={3} className='color-title-balloon-wrapper'>
            <div className='color-title-balloon'>
              <span className='triangle'/>
              <span>{color.label}</span>
            </div>
          </Stick>
        </Portal>
      );
    }
  }
}
