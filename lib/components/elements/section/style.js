import {Types} from '../../../data-types';
import {getColorString, applyBackground} from '../../../helpers/colors';

export default {
  type: 'section',
  options: [
    {
      label: 'Background Color',
      type: 'Optional',
      id: 'useBackgroundColor',
      unlocks: [
        {
          type: Types.Color,
          id: 'backgroundColor',
          props: {
            gradients: true
          }
        }
      ]
    },
    {
      label: 'Height',
      type: 'Optional',
      id: 'useFixHeight',
      unlocks: [
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
    },
    {
      label: 'Padding',
      type: Types.Padding,
      id: 'padding'
    }
  ],
  defaults: {
    useBackgroundColor: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    useFixHeight: false,
    heightPerc: '100%',
    contentVertical: '50%',
    padding: '20px'
  },
  rules: (props) => {
    const rule = {};
    const contentRule = {};

    props.useBackgroundColor && applyBackground(rule, props.backgroundColor);

    if (props.useFixHeight) {
      rule.height = parseInt(props.heightPerc, 10) + 'vh';
      contentRule.position = 'relative';
      contentRule.top = props.contentVertical;
      contentRule.transform = 'translateY(-' + props.contentVertical + ')';
    }

    rule.padding = props.padding;

    return {
      section: rule,
      content: contentRule
    };
  },
  getIdentifierLabel: (props) => {
    let str = '';

    if (props.useFixHeight) {
      str += props.heightPerc + '%';
    } else {
      str += 'Auto';
    }

    str += ' | ';

    if (props.useBackgroundColor) {
      str += getColorString(props.backgroundColor);
    } else {
      str += 'transparent';
    }

    return str;
  }
};
