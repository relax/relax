import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';
import {getColorString} from 'helpers/styles/colors';

export default {
  type: 'button',
  options: [
    layoutOptions,
    {
      label: 'Size and Alignment',
      type: 'Section',
      id: 'sizeAlignSection',
      unlocks: [
        {
          label: 'Size',
          type: 'Select',
          id: 'size',
          props: {
            labels: ['Full Width', 'Fit Content', 'Max Width (px)', 'Strict (px)'],
            values: ['full', 'fit', 'max', 'strict']
          },
          unlocks: {
            fit: [
              {
                label: 'Horizontal alignment',
                type: 'Select',
                id: 'alignment',
                props: {
                  labels: ['Left', 'Center', 'Right'],
                  values: ['left', 'center', 'right']
                }
              }
            ],
            max: [
              {
                label: 'Max Width',
                type: 'Number',
                id: 'maxWidth',
                props: {
                  allowed: ['%', 'px']
                }
              },
              {
                label: 'Horizontal alignment',
                type: 'Select',
                id: 'alignment',
                props: {
                  labels: ['Left', 'Center', 'Right'],
                  values: ['left', 'center', 'right']
                }
              }
            ],
            strict: [
              {
                label: 'Width',
                type: 'Pixels',
                id: 'width'
              },
              {
                label: 'Height',
                type: 'Pixels',
                id: 'height'
              },
              {
                label: 'Horizontal alignment',
                type: 'Select',
                id: 'alignment',
                props: {
                  labels: ['Left', 'Center', 'Right'],
                  values: ['left', 'center', 'right']
                }
              }
            ]
          }
        }
      ]
    },

    {
      label: 'Default state',
      type: 'Section',
      id: 'defaultSection',
      unlocks: [
        {
          label: 'Text Color',
          type: 'Optional',
          id: 'useColor',
          unlocks: [
            {
              type: 'Color',
              id: 'color'
            }
          ]
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'useBackground',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColor'
            }
          ]
        },
        {
          label: 'Border',
          type: 'Optional',
          id: 'useBorder',
          unlocks: [
            {
              type: 'Border',
              id: 'border'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'useCorners',
          unlocks: [
            {
              type: 'Corners',
              id: 'corners'
            }
          ]
        }
      ]
    },
    {
      label: 'Overed state',
      type: 'Section',
      id: 'overedSection',
      unlocks: [
        {
          label: 'Text Color',
          type: 'Optional',
          id: 'useColorOver',
          unlocks: [
            {
              type: 'Color',
              id: 'colorOver'
            }
          ]
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'useBackgroundOver',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColorOver'
            }
          ]
        },
        {
          label: 'Border Color',
          type: 'Optional',
          id: 'useBorderColorOver',
          unlocks: [
            {
              type: 'Color',
              id: 'borderColorOver'
            }
          ]
        },
        {
          label: 'Rounded Corners',
          type: 'Optional',
          id: 'useCornersOver',
          unlocks: [
            {
              type: 'Corners',
              id: 'cornersOver'
            }
          ]
        },
        {
          label: 'Animation on Over',
          type: 'Optional',
          id: 'useAnimation',
          unlocks: [
            {
              type: 'Number',
              id: 'animationDuration',
              props: {
                label: 'ms'
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Pressed state',
      type: 'Section',
      id: 'pressedSection',
      unlocks: [
        {
          label: 'Text Color',
          type: 'Optional',
          id: 'useColorPressed',
          unlocks: [
            {
              type: 'Color',
              id: 'colorPressed'
            }
          ]
        },
        {
          label: 'Background',
          type: 'Optional',
          id: 'useBackgroundPressed',
          unlocks: [
            {
              type: 'Color',
              id: 'backgroundColorPressed'
            }
          ]
        },
        {
          label: 'Border Color',
          type: 'Optional',
          id: 'useBorderColorPressed',
          unlocks: [
            {
              type: 'Color',
              id: 'borderColorPressed'
            }
          ]
        }
      ]
    }
  ],
  defaults: {
    size: 'fit',
    maxWidth: '100%',
    width: '70px',
    height: '70px',
    alignment: 'center',
    usePadding: false,
    marginPadding: {
      'padding-top': '20px',
      'padding-right': '20px',
      'padding-bottom': '20px',
      'padding-left': '20px'
    },

    useColor: false,
    color: {
      value: '#ffffff',
      opacity: 100
    },
    useBackground: true,
    backgroundColor: {
      value: '#23a7ff',
      opacity: 100
    },
    useBorder: false,
    border: false,
    useCorners: false,
    corners: '0px',

    useColorOver: false,
    colorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useBackgroundOver: false,
    backgroundColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useBorderColorOver: false,
    borderColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useCornersOver: false,
    cornersOver: '0px',
    useAnimation: false,
    animationDuration: 500,

    useColorPressed: false,
    colorPressed: {
      value: '#ffffff',
      opacity: 100
    },
    useBackgroundPressed: false,
    backgroundColorPressed: {
      value: '#ffffff',
      opacity: 100
    },
    useBorderColorPressed: false,
    borderColorPressed: {
      value: '#ffffff',
      opacity: 100
    }
  },
  rules: (props) => {
    const holderRules = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMargin(props.marginPadding)
      .when(props.size !== 'full')
        .setProperty('textAlign', props.alignment)
      .rules;

    const buttonRules = css({
      '*': {},
      ':hover': {
        '*': {}
      },
      ':active': {
        '*': {}
      }
    })
      .setPadding(props.marginPadding)
      .setBackgroundColor(props.useBackground && props.backgroundColor)
      .setProperty('borderRadius', props.useCorners && props.corners)
      .setProperty(
        'transition',
        props.useAnimation && `all ${props.animationDuration}ms cubic-bezier(0.190, 1.000, 0.220, 1.000)`
      )
      .setBorder(props.useBorder && props.border)
      .when(props.size === 'strict')
        .setProperty('width', props.width)
        .setProperty('height', props.height)
      .when(props.size !== 'full')
        .setProperty('display', 'inline-block')
      .when(props.size === 'full')
        .setProperty('display', 'block')
      .when(props.size === 'max')
        .setProperty('maxWidth', props.maxWidth)
      .rules;

    // button children
    css(buttonRules['*']).setColor(props.useColor && props.color);

    // button on hover
    css(buttonRules[':hover'])
      .setProperty('borderRadius', props.useCornersOver && props.cornersOver)
      .setProperty(
        'borderColor',
        props.useBorder && props.useBorderColorOver && getColorString(props.borderColorOver)
      )
      .setBackgroundColor(props.useBackgroundOver && props.backgroundColorOver);
    css(buttonRules[':hover']['*']).setColor(props.useColorOver && props.colorOver);

    // button active
    css(buttonRules[':active'])
      .setBackgroundColor(props.useBackgroundPressed && props.backgroundColorPressed)
      .setProperty(
        'borderColor',
        props.useBorder && props.useBorderColorPressed && getColorString(props.borderColorPressed)
      );
    css(buttonRules[':active']['*'])
      .setColor(props.useColorPressed && props.colorPressed);

    return {
      holder: holderRules,
      button: buttonRules
    };
  }
};
