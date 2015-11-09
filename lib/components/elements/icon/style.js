import {Types} from '../../../data-types';
import {getColorString} from '../../../helpers/colors';

export default {
  type: 'icon',
  options: [
    {
      label: 'Color',
      type: Types.Color,
      id: 'color'
    },
    {
      label: 'Font size',
      type: Types.Pixels,
      id: 'size'
    },
    {
      label: 'Use Background',
      type: 'Optional',
      id: 'background',
      unlocks: [
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
          label: 'Background Color',
          type: Types.Color,
          id: 'backgroundColor'
        },
        {
          label: 'Rounded Corners',
          type: Types.Corners,
          id: 'corners'
        }
      ]
    }
  ],
  defaults: {
    color: {
      value: '#ffffff',
      opacity: 100
    },
    size: 16,
    background: false,
    width: 70,
    height: 70,
    backgroundColor: {
      value: '#000000',
      opacity: 100
    },
    corners: '0px'
  },
  rules: (props) => {
    const rules = {
      icon: {}
    };

    rules.icon.fontSize = props.size;
    rules.icon.color = getColorString(props.color);

    if (props.background) {
      rules.holder = {};

      rules.holder.width = props.width;
      rules.holder.height = props.height;
      rules.holder.backgroundColor = getColorString(props.backgroundColor);
      rules.holder.borderRadius = props.corners;

      rules.icon.lineHeight = props.height + 'px';
    }

    return rules;
  },
  getIdentifierLabel: (props) => {
    let str = '';

    str += props.size + 'px';
    str += ' | ';
    str += getColorString(props.color);

    return str;
  }
};
