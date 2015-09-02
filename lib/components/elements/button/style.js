import {Types} from '../../../data-types';
import Colors from '../../../colors';
import Utils from '../../../utils';

export default {
  type: 'button',
  options: [
    {
      label: 'Size',
      type: Types.Select,
      id: 'size',
      props: {
        labels: ['Full Width', 'Fit Content', 'Max Width (px)', 'Strict (px)'],
        values: ['full', 'fit', 'max', 'strict']
      },
      unlocks: {
        fit : [
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
            type: Types.Pixels,
            id: 'maxWidth'
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
      label: 'Color (overlaps texts color)',
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
      label: 'Color On Over',
      type: 'Optional',
      id: 'useColorHover',
      unlocks: [
        {
          type: Types.Color,
          id: 'colorHover'
        }
      ]
    },
    {
      label: 'Use Background',
      type: 'Optional',
      id: 'useBackground',
      unlocks: [
        {
          label: 'Background Color',
          type: Types.Color,
          id: 'backgroundColor'
        },
        {
          label: 'Background Color on over',
          type: Types.Color,
          id: 'backgroundColorOver'
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
        },
        {
          label: 'Border Color on over',
          type: Types.Color,
          id: 'borderColorOver'
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
    },
    {
      label: 'Animation on hover',
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
  ],
  defaults: {
    size: 'fit',
    maxWidth: 200,
    width: 70,
    height: 70,
    alignment: 'center',
    useColor: false,
    color: {
      value: '#ffffff',
      opacity: 100
    },
    useColorHover: false,
    colorHover: {
      value: '#ffffff',
      opacity: 100
    },
    useBackground: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    backgroundColorHover: {
      value: '#ffffff',
      opacity: 100
    },
    useBorder: false,
    border: false,
    borderColorOver: {
      value: '#ffffff',
      opacity: 100
    },
    useCorners: false,
    corners: '0px',
    usePadding: false,
    padding: '0px',
    useAnimation: false,
    animationDuration: 500
  },
  rules: (props) => {
    let rules = {
      button: {
        backgroundColor: props.useBackground && Colors.getColorString(props.backgroundColor),
        borderRadius: props.useCorners && props.corners,
        padding: props.usePadding && props.padding,
        '*': {
          color: props.useColor && Colors.getColorString(props.color)
        },
        ':hover': {
          '*': {
            color: props.useColorHover && Colors.getColorString(props.colorHover)
          },
          backgroundColor: props.useBackground && Colors.getColorString(props.backgroundColorHover),
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
      rules.button.transition = 'all '+props.animationDuration+'ms cubic-bezier(0.190, 1.000, 0.220, 1.000)';
    }

    if (props.useBorder) {
      Utils.applyBorders(rules.button, props.border);
      rules.button[':hover'].borderColor = Colors.getColorString(props.borderColorOver);
    }

    return rules;
  }
};
