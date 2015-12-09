import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

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

  onClick () {
    this.props.selectColor(this.props.color._id);
  }

  onMouseEnter () {
    const {color, addOverlay} = this.props;
    addOverlay(color._id, (
      <Stick element={findDOMNode(this)} className='color-title-balloon-wrapper' key={color._id}>
        <div className='color-title-balloon'>
          <span className='triangle'/>
          <span>{color.label}</span>
        </div>
      </Stick>
    ), false);
  }

  onMouseLeave () {
    const {color, closeOverlay} = this.props;
    closeOverlay(color._id);
  }

  render () {
    const style = {
      backgroundColor: this.props.color.value
    };

    return (
      <div className='color' style={style} onClick={::this.onClick} onMouseEnter={::this.onMouseEnter} onMouseLeave={::this.onMouseLeave} />
    );
  }
}
