import css from 'helpers/styles/css';
import layoutOptions from 'helpers/styles/layout-options';

export default {
  type: 'video',
  options: [
    layoutOptions,
    {
      label: 'Size',
      type: 'Section',
      id: 'sizeSection',
      unlocks: [
        {
          label: 'Video Height',
          type: 'Buttons',
          id: 'videoHeight',
          props: {
            labels: ['16/9', '4/3', 'Custom'],
            values: ['56%', '75%', 'custom']
          },
          unlocks: {
            custom: [
              {
                label: 'Custom Percentage',
                type: 'Percentage',
                id: 'videoHeightPerc',
                props: {
                  max: 200
                }
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
    videoHeight: '56%',
    videoHeightPerc: '56%'
  },
  rules: (props) => {
    const root = css({})
      .setDisplay(props.display)
      .setPosition(props.position)
      .setMarginPadding(props.marginPadding)
      .setCustoms(props.custom)
      .rules;

    return {
      root
    };
  }
};
