import {Types} from '../../../data-types';
import Colors from '../../../colors';

export default {
  type: 'section',
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
      label: 'Height',
      type: Types.Select,
      id: 'height',
      props: {
        labels: ['Auto', 'Strict Height'],
        values: ['auto', 'strict']
      },
      unlocks: {
        strict: [
          {
            label: 'Percentage from viewport',
            type: Types.Percentage,
            id: 'heightPerc',
            props: {
              min: 0,
              max: 200
            }
          },
          {
            label: 'Content vertical alignment',
            type: Types.Percentage,
            id: 'contentVertical'
          }
        ]
      }
    },
    {
      label: 'Padding',
      type: Types.Padding,
      id: 'padding'
    }
  ],
  defaults: {
    backgroundColor: 'transparent',
    color: {
      value: '#ffffff',
      opacity: 100
    },
    height: 'auto',
    heightPerc: 100,
    contentVertical: 50,
    padding: '20px'
  },
  rules: (props) => {
    var rule = {};
    var contentRule = {};

    if (props.backgroundColor === 'color') {
      rule.backgroundColor = Colors.getColorString(props.color);
    }

    if (props.height === 'strict') {
      rule.height = props.heightPerc+'vh';
      contentRule.position = 'relative';
      contentRule.top = props.contentVertical+'%';
      contentRule.transform = 'translateY(-'+props.contentVertical+'%)';
    }

    rule.padding = props.padding;

    return {
      section: rule,
      content: contentRule
    };
  },
  getIdentifierLabel: (props) => {
    var str = '';

    if (props.height === 'strict') {
      str += props.heightPerc+'%';
    } else {
      str += 'Auto';
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
