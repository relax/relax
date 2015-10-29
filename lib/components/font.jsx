import React from 'react';
import {Component} from 'relax-framework';

import Utils from '../utils';

export default class Font extends Component {
  propTypes = {
    input: React.PropTypes.bool,
    style: React.PropTypes.object,
    family: React.PropTypes.string,
    fvd: React.PropTypes.string,
    onChange: React.PropTypes.func,
    text: React.PropTypes.string
  }
  render () {
    const style = this.props.style || {};
    style.fontFamily = this.props.family;
    Utils.processFVD(style, this.props.fvd);

    let content = '';

    if (this.props.input) {
      content = <input className='font' style={style} value={this.props.text} onChange={this.props.onChange}></input>;
    } else {
      content = <div className='font' style={style}>{this.props.text}</div>;
    }

    return content;
  }
}
