import Utils from '../../../utils';
import {Types} from '../../../data-types';
import {getColorString} from '../../../helpers/colors';

export default {
  type: 'button',
  options: [
    {
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
      unlocks: [
        {
          label: 'Size',
          type: Types.Select,
          id: 'size',
          props: {
            labels: ['Full Width', 'Fit Content', 'Max Width (px)', 'Strict (px)'],
            values: ['full', 'fit', 'max', 'strict']
          },
          unlocks: {
            fit: [
              {
                label: 'Horizontal alignment',
                type: Types.Select,
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
                type: Types.Number,
                id: 'maxWidth',
                props: {
                  allowed: ['%', 'px']
                }
              },
              {
                label: 'Horizontal alignment',
                type: Types.Select,
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
                type: Types.Pixels,
                id: 'width'
              },
              {
                label: 'Height',
                type: Types.Pixels,
                id: 'height'
              },
              {
                label: 'Horizontal alignment',
                type: Types.Select,
                id: 'alignment',
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
          type: 'Optional',
          id: 'usePadding',
          unlocks: [
            {
              type: Types.Padding,
              id: 'padding'
            }
          ]
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
              type: Types.Color,
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
              type: Types.Color,
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
              type: Types.Border,
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
              type: Types.Corners,
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
              type: Types.Color,
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
              type: Types.Color,
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
              type: Types.Color,
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
              type: Types.Corners,
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
              type: Types.Number,
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
              type: Types.Color,
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
              type: Types.Color,
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
              type: Types.Color,
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
    padding: '0px',

    useColor: false,
    color: {
      value: '#ffffff',
      opacity: 100
    },
    useBackground: false,
    backgroundColor: {
      value: '#ffffff',
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
    const rules = {
      button: {
        backgroundColor: props.useBackground && getColorString(props.backgroundColor),
        borderRadius: props.useCorners && props.corners,
        padding: props.usePadding && props.padding,
        '*': {
          color: props.useColor && getColorString(props.color)
        },
        ':hover': {
          '*': {
            color: props.useColorOver && getColorString(props.colorOver)
          },
          borderRadius: props.useCornersOver && props.cornersOver,
          backgroundColor: props.useBackgroundOver && getColorString(props.backgroundColorOver)
        },
        ':active': {
          '*': {
            color: props.useColorPressed && getColorString(props.colorPressed)
          },
          backgroundColor: props.useBackgroundPressed && getColorString(props.backgroundColorPressed)
        }
      },
      holder: {}
    };

    if (props.size === 'strict') {
      rules.button.width = props.width;
      rules.button.height = props.height;
    } else if (props.size === 'fit') {
      rules.button.display = 'inline-block';
    } else if (props.size === 'max') {
      rules.button.maxWidth = props.maxWidth;
    }

    if (props.size !== 'full') {
      rules.holder.textAlign = props.alignment;
      rules.button.display = 'inline-block';
    }

    if (props.useAnimation) {
      rules.button.transition = 'all ' + props.animationDuration + 'ms cubic-bezier(0.190, 1.000, 0.220, 1.000)';
    }

    if (props.useBorder) {
      Utils.applyBorders(rules.button, props.border);

      if (props.useBorderColorOver) {
        rules.button[':hover'].borderColor = getColorString(props.borderColorOver);
      }

      if (props.useBorderColorPressed) {
        rules.button[':active'].borderColor = getColorString(props.borderColorPressed);
      }
    }

    return rules;
  }
};
