import {getColorString} from 'helpers/colors';

export default {
  type: 'icon',
  options: [
    {
      label: 'Color',
      type: 'Color',
      id: 'color'
    },
    {
      label: 'Font size',
      id: 'size',
      type: 'Number',
      props: {
        allowed: ['px', 'em', 'pt']
      }
    },
    {
      label: 'Use Background',
      type: 'Optional',
      id: 'background',
      unlocks: [
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
          label: 'Background Color',
          type: 'Color',
          id: 'backgroundColor'
        },
        {
          label: 'Rounded Corners',
          type: 'Corners',
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
    size: '16px',
    background: false,
    width: '70px',
    height: '70px',
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

      rules.icon.lineHeight = props.height;
    }

    return rules;
  },
  getIdentifierLabel: (props) => {
    let str = '';

    str += props.size;
    str += ' | ';
    str += getColorString(props.color);

    return str;
  }
};
