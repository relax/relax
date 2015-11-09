import {Component} from 'relax-framework';
import React, {PropTypes} from 'react';
import Utils from '../../../../utils';

export default class Font extends Component {
  static propTypes = {
    style: PropTypes.object,
    family: PropTypes.string.isRequired,
    fvd: PropTypes.string.isRequired,
    input: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    style: {}
  }

  render () {
    let result;
    const style = this.props.style;
    style.fontFamily = this.props.family;
    Utils.processFVD(style, this.props.fvd);

    if (this.props.input) {
      result = (
        <input className='font' style={style} value={this.props.text} onChange={this.props.onChange}></input>
      );
    } else {
      result = (
        <div className='font' style={style}>
          {this.props.text}
        </div>
      );
    }

    return result;
  }
}
