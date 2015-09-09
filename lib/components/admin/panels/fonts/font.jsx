import {Component} from 'relax-framework';
import React from 'react';
import Utils from '../../../../utils';

export default class Font extends Component {

  render () {

    var style = this.props.style || {};
    style.fontFamily = this.props.family;
    Utils.processFVD(style, this.props.fvd);

    var content = '';

    if (this.props.input) {
      content = <input className='font' style={style} value={this.props.text} onChange={this.props.onChange}></input>;
    }
    else {
      content = <div className='font' style={style}>{this.props.text}</div>;
    }

    return content;
  }
}
