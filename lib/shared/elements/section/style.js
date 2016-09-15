import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'section',
  options: [
    layoutOptions,
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
    position: {
      position: 'relative'
    },
    marginPadding: {
      'padding-top': '20px',
      'padding-right': '20px',
      'padding-bottom': '20px',
      'padding-left': '20px'
    },
    useBackgroundColor: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    useFixHeight: false,
    heightPerc: '100%',
    contentVertical: '50%'
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
