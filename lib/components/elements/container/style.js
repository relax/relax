import {Types} from '../../../data-types';
import Colors from '../../../colors';
import Utils from '../../../utils';

export default {
  type: 'container',
  options: [
    {
      label: 'Background Color',
      type: Types.Select,
      id: 'backgroundColor',
      props: {
        labels: ['Transparent', 'Color'],
        values: ['transparent', 'color']
      },
      unlocks: {
        color: [
          {
            label: 'Background color',
            type: Types.Color,
            id: 'color'
          }
        ]
      }
    },
    {
      label: 'Width',
      type: Types.Select,
      id: 'width',
      props: {
        labels: ['Full Width', 'Max Width'],
        values: ['full', 'max']
      },
      unlocks: {
        max: [
          {
            label: 'Maximum Width',
            type: Types.Pixels,
            id: 'widthPx',
            props: {
              min: 0,
              max: false
            }
          },
          {
            label: 'Content horizontal alignment',
            type: Types.Select,
            id: 'contentHorizontal',
            props: {
              labels: ['Left', 'Center', 'Right'],
              values: ['left', 'center', 'right']
            }
          }
        ]
      }
    },
    {
      label: 'Padding',
      type: Types.Padding,
      id: 'padding'
    },
    {
      label: 'Rounded Corners',
      type: Types.Corners,
      id: 'corners'
    },
    {
      label: 'Border',
      type: Types.Border,
      id: 'border'
    }
  ],
  defaults: {
    backgroundColor: 'transparent',
    color: {
      value: '#ffffff',
      opacity: 100
    },
    width: 'max',
    widthPx: 100,
    contentHorizontal: 'center',
    padding: '20px',
    corners: '0px'
  },
  rules: (props) => {
    var rule = {};
    var holderRule = {};

    if (props.backgroundColor === 'color') {
      rule.backgroundColor = Colors.getColorString(props.color);
    }

    if (props.width === 'max') {
      rule.maxWidth = props.widthPx;
      rule.width = '100%';
      rule.display = 'inline-block';

      holderRule.textAlign = props.contentHorizontal;
    }

    rule.padding = props.padding;
    rule.borderRadius = props.corners;
    Utils.applyBorders(rule, props.border);

    return {
      container: rule,
      holder: holderRule
    };
  },
  getIdentifierLabel: (props) => {
    var str = '';

    if (props.width === 'max') {
      str += props.widthPx+'px';
    } else {
      str += 'Full';
    }

    str += ' | ';

    if (props.backgroundColor === 'color') {
      str += Colors.getColorString(props.color);
    } else {
      str += 'transparent';
    }

    return str;
  }
};
