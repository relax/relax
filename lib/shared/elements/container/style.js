import utils from 'helpers/utils';
import {getColorString, applyBackground} from 'helpers/colors';

export default {
  type: 'container',
  options: [
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
    },
    {
      label: 'Max Width',
      type: 'Optional',
      id: 'useMaxWidth',
      unlocks: [
        {
          label: 'Maximum Width',
          type: 'Pixels',
          id: 'widthPx',
          props: {
            min: 0,
            max: false
          }
        },
        {
          label: 'Content horizontal alignment',
          type: 'Select',
          id: 'contentHorizontal',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Padding',
      type: 'Padding',
      id: 'padding'
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
      label: 'Shadow',
      type: 'BoxShadow',
      id: 'shadow'
    }
  ],
  defaults: {
    useBackgroundColor: false,
    backgroundColor: {
      value: '#ffffff',
      opacity: 100
    },
    useMaxWidth: true,
    widthPx: '1000px',
    contentHorizontal: 'center',
    padding: '20px',
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: []
  },
  rules: (props) => {
    const rule = {};
    const holderRule = {};

    props.useBackgroundColor && applyBackground(rule, props.backgroundColor);

    if (props.useMaxWidth) {
      rule.maxWidth = props.widthPx;
      rule.width = '100%';
      rule.display = 'inline-block';

      holderRule.textAlign = props.contentHorizontal;
    }

    rule.padding = props.padding;
    rule.borderRadius = props.useCorners && props.corners;

    if (props.useBorder) {
      utils.applyBorders(rule, props.border);
    }

    if (props.shadow && props.shadow.length > 0) {
      utils.applyBoxShadows(rule, props.shadow);
    }

    return {
      container: rule,
      holder: holderRule
    };
  },
  getIdentifierLabel: (props) => {
    let str = '';

    if (props.useMaxWidth) {
      str += props.widthPx;
    } else {
      str += 'Full';
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
