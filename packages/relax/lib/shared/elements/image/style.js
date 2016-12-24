import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'image',
  options: [
    layoutOptions,
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background color',
          type: 'Color',
          id: 'color'
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
      ]
    },
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Strict height',
          type: 'Optional',
          id: 'strictHeight',
          unlocks: [
            {
              type: 'Columns',
              options: [
                {
                  label: 'Pixels',
                  type: 'Pixels',
                  id: 'height'
                },
                {
                  label: 'Vert. position',
                  type: 'Percentage',
                  id: 'vertical'
                }
              ]
            }
          ]
        },
        {
          label: 'Max Width',
          type: 'Optional',
          id: 'useMaxWidth',
          unlocks: [
            {
              type: 'Columns',
              options: [
                {
                  label: 'Pixels',
                  type: 'Pixels',
                  id: 'width'
                },
                {
                  label: 'Hor. alignment',
                  type: 'Select',
                  id: 'horizontal',
                  props: {
                    labels: ['Left', 'Center', 'Right'],
                    values: ['left', 'center', 'right']
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  defaults: {
    color: {
      value: '#ffffff',
      opacity: 0
    },
    useCorners: false,
    corners: '0px',
    useBorder: false,
    shadow: [],
    strictHeight: false,
    height: '200px',
    vertical: '50%',
    useMaxWidth: false,
    width: '300px',
    horizontal: 'center'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setBackgroundColor(props.color)
      .when(!props.useMaxWidth)
        .setProperty('borderRadius', props.useCorners && props.corners)
        .setBorder(props.useBorder && props.border)
        .setBoxShadows(props.shadow)
        .setProperty('overflow', 'hidden')
      .when(props.strictHeight)
        .setProperty('height', props.height)
        .setProperty('overflow', 'hidden')
      .when(props.useMaxWidth)
        .setProperty('textAlign', props.horizontal)
      .rules;

    const image = css({})
      .setProperty('width', '100%')
      .setProperty('maxWidth', '100%')
      .when(props.strictHeight)
        .setProperty('transform', `translateY(-${props.vertical})`)
        .setProperty('top', parseInt(props.height, 10) * (parseInt(props.vertical, 10) / 100))
        .setProperty('position', 'relative')
      .when(props.useMaxWidth)
        .setProperty('borderRadius', props.useCorners && props.corners)
        .setBorder(props.useBorder && props.border)
        .setBoxShadows(props.shadow)
        .setProperty('maxWidth', props.width)
      .rules;

    return {
      root,
      image
    };
  }
};
