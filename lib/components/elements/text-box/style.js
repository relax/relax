import React from 'react';
import Utils from '../../../utils';
import Colors from '../../../colors';
import {Types} from '../../../data-types';

export default {
  type: 'text',
  options: [
    {
      label: 'Font Family',
      id: 'font',
      type: Types.Font
    },
    {
      label: 'Font Size',
      id: 'fontSize',
      type: Types.Pixels
    },
    {
      label: 'Line Height',
      id: 'lineHeight',
      type: Types.Pixels
    },
    {
      label: 'Letter Spacing',
      id: 'letterSpacing',
      type: Types.Pixels
    },
    {
      label: 'Color',
      id: 'color',
      type: Types.Color
    },
    {
      label: 'Links underline',
      id: 'linkUnderline',
      type: Types.Boolean
    },
    {
      label: 'Links color',
      id: 'linkColor',
      type: Types.Color
    },
    {
      label: 'Links color hover',
      id: 'linkColorOver',
      type: Types.Color
    }
  ],
  defaults: {
    font: {},
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: {
      value: '#ffffff',
      opacity: 100
    },
    linkUnderline: true,
    linkColor: {
      value: '#ffffff',
      opacity: 100
    },
    linkColorOver: {
      value: '#ffffff',
      opacity: 100
    }
  },
  rules: (props) => {
    var rule = {};
    rule.fontSize = props.fontSize+'px';
    rule.lineHeight = props.lineHeight+'px';
    rule.color = Colors.getColorString(props.color);
    rule.letterSpacing = props.letterSpacing+'px';

    if (props.font && props.font.family && props.font.fvd) {
      rule.fontFamily = props.font.family;
      Utils.processFVD(rule, props.font.fvd);
    }

    // links
    rule.a = {
      textDecoration: props.linkUnderline ? 'underline' : 'none',
      color: Colors.getColorString(props.linkColor),
      ':hover': {
        color: Colors.getColorString(props.linkColorOver)
      }
    };

    return {
      text: rule
    };
  },
  getIdentifierLabel: (props) => {
    var variation = props.font && props.font.fvd && ' ' + props.font.fvd.charAt(1)+'00' || '';
    return (props.font && props.font.family || '') + variation;
  },
  preview: (classesMap) => {
    var holderStyle = {
      height: 55,
      lineHeight: '55px'
    };
    var style = {
      display: 'inline-block',
      verticalAlign: 'bottom'
    };

    return (
      <div style={holderStyle}>
        <div className={classesMap.text || ''} style={style}>month</div>
      </div>
    );
  }
};
