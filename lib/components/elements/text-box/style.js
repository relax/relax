import Utils from '../../../utils';
import {Types} from '../../../data-types';
import {getColorString} from '../../../helpers/colors';

export default {
  type: 'text',
  options: [
    {
      label: 'Font Family',
      id: 'font',
      type: Types.Font
    },
    {
      type: 'Columns',
      options: [
        {
          label: 'Font Size',
          id: 'fontSize',
          type: Types.Pixels
        },
        {
          label: 'Line Height',
          id: 'lineHeight',
          type: Types.Pixels
        }
      ]
    },
    {
      type: 'Columns',
      options: [
        {
          label: 'Letter Spacing',
          id: 'letterSpacing',
          type: Types.Pixels
        },
        {
          label: 'Color',
          id: 'color',
          type: Types.Color
        }
      ]
    },
    {
      type: 'Columns',
      options: [
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
      ]
    },
    {
      label: 'Links underline',
      id: 'linkUnderline',
      type: Types.Boolean
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
    const rule = {
      fontSize: props.fontSize + 'px',
      lineHeight: props.lineHeight + 'px',
      letterSpacing: props.letterSpacing + 'px',
      color: getColorString(props.color)
    };

    if (props.font && props.font.family && props.font.fvd) {
      rule.fontFamily = props.font.family;
      Utils.processFVD(rule, props.font.fvd);
    }

    // links
    rule.a = {
      textDecoration: props.linkUnderline ? 'underline' : 'none',
      color: getColorString(props.linkColor),
      ':hover': {
        color: getColorString(props.linkColorOver)
      }
    };

    return {
      text: rule
    };
  },
  getIdentifierLabel: (props) => {
    const variation = props.font && props.font.fvd && ' ' + props.font.fvd.charAt(1) + '00' || '';
    return (props.font && props.font.family || '') + variation;
  }
};
