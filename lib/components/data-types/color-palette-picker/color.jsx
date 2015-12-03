import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

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
    selectColor: PropTypes.func.isRequired
  }

  onClick () {
    this.props.selectColor(this.props.color._id);
  }

  render () {
    const style = {
      backgroundColor: this.props.color.value
    };

    return (
      <div className='color' style={style} onClick={::this.onClick} />
    );
  }
}
