import css from 'helpers/styles/css';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'section',
  options: [
    {
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
      unlocks: [
        {
          label: 'Display',
          type: 'Display',
          id: 'display'
        },
        {
          label: 'Position',
          type: 'Position',
          id: 'position'
        },
        {
          label: 'Padding and Margin',
          type: 'MarginPadding',
          id: 'marginPadding'
        }
      ]
    },
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Optional',
          id: 'useBackgroundColor',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColor',
              props: {
                gradients: true
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Fix Height',
          type: 'Optional',
          id: 'useFixHeight',
          unlocks: [
            {
              label: 'Percentage from viewport',
              type: 'Percentage',
              id: 'heightPerc',
              props: {
                min: 0,
                max: 200
              }
            },
            {
              label: 'Content vertical alignment',
              type: 'Percentage',
              id: 'contentVertical'
            }
          ]
        }
      ]
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

    css(rule)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setBackgroundColor(props.useBackgroundColor && props.backgroundColor)
      .setProperty('height', props.useFixHeight && `${parseInt(props.heightPerc, 10)}vh`);

    if (props.useFixHeight) {
      css(contentRule)
        .setProperty('position', 'relative')
        .setProperty('top', props.contentVertical)
        .setProperty('transform', `translateY(-${props.contentVertical})`);
    }

    return {
      section: rule,
      content: contentRule
    };
  },
  getIdentifierLabel: (props) => {
    let str = '';

    if (props.useFixHeight) {
      str += `${props.heightPerc}%`;
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
