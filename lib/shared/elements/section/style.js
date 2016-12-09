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
          label: 'Background Layers',
          type: 'Background',
          id: 'background'
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
          type: 'Buttons',
          id: 'useFixHeight',
          props: {
            labels: ['Auto', 'Viewport %', 'Custom'],
            values: ['auto', 'viewport', 'custom']
          },
          unlocks: {
            viewport: [
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
            ],
            custom: [
              {
                label: 'Custom Height',
                type: 'Number',
                id: 'height',
                props: {
                  allowed: ['%', 'px', 'pt']
                }
              },
              {
                label: 'Content vertical alignment',
                type: 'Percentage',
                id: 'contentVertical'
              }
            ]
          }
        }
      ]
    },
    {
      label: 'Custom',
      type: 'Section',
      id: 'customSection',
      unlocks: [
        {
          label: 'Custom Properties',
          type: 'Custom',
          id: 'custom'
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
    background: [],
    useFixHeight: 'auto',
    heightPerc: '100%',
    height: '300px',
    contentVertical: '50%'
  },
  rules: (props) => {
    const rule = {};
    const contentRule = {};

    css(rule)
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setBackground(props.background)
      .setCustoms(props.custom)
      .when(props.useFixHeight === 'viewport')
        .setProperty('height', `${parseInt(props.heightPerc, 10)}vh`)
      .when(props.useFixHeight === 'custom')
        .setProperty('height', props.height);

    if (props.useFixHeight !== 'auto') {
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
