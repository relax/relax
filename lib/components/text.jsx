import {Component} from 'relax-framework';
import React from 'react';
import Utils from '../utils';

export default class Text extends Component {
  getStyle () {
    var style = {};

    if (this.props.style && typeof this.props.style !== 'undefined' && this.props.style.options) {
      var options = this.props.style.options;
      style.fontSize = options.fontSize+'px';
      style.lineHeight = options.lineHeight+'px';
      style.color = options.color;

      if (options.font && options.font.family && options.font.fvd) {
        style.fontFamily = options.font.family;
        Utils.processFVD(style, options.font.fvd);
      }
    }

    return style;
  }

  render () {
    var style = this.getStyle();

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}

Text.propTypes = {
  style: React.PropTypes.object
};
