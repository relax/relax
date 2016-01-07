import utils from '../../../utils';
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
          type: Types.Number,
          props: {
            allowed: ['px', 'em', 'pt']
          }
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
          type: Types.Number,
          props: {
            allowed: ['px', 'em', 'pt']
          }
        },
        {
          label: 'Color',
          id: 'color',
          type: Types.Color
        }
      ]
    },
    {
      label: 'Shadow',
      id: 'shadow',
      type: Types.TextShadow
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
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0px',
    color: {
      value: '#ffffff',
      opacity: 100
    },
    shadow: [],
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
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      letterSpacing: props.letterSpacing,
      color: getColorString(props.color)
    };

    if (props.font && props.font.family && props.font.fvd) {
      rule.fontFamily = props.font.family;
      utils.processFVD(rule, props.font.fvd);
    }

    if (props.shadow && props.shadow.length > 0) {
      utils.applyTextShadows(rule, props.shadow);
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
