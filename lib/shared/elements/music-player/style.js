import Utils from 'helpers/utils';
import {getColorString} from 'helpers/colors';

export default {
  type: 'musicplayer',
  options: [
    {
      label: 'Background',
      type: 'Section',
      id: 'backgroundSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Color',
          id: 'backgroundColor'
        },
        {
          label: 'Padding',
          type: 'Padding',
          id: 'padding'
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
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
      unlocks: [
        {
          label: 'Controls area padding',
          type: 'Padding',
          id: 'controlsPadding'
        },
        {
          label: 'Playback area padding',
          type: 'Padding',
          id: 'playbackPadding'
        },
        {
          label: 'Volume area padding',
          type: 'Padding',
          id: 'volumePadding'
        },
        {
          label: 'Divider Width',
          type: 'Pixels',
          id: 'dividerWidth'
        },
        {
          label: 'Divider Color',
          type: 'Color',
          id: 'dividerColor'
        }
      ]
    },
    {
      label: 'Progress and volume bars',
      type: 'Section',
      id: 'barsSection',
      unlocks: [
        {
          label: 'Background Color',
          type: 'Color',
          id: 'barsBackgroundColor'
        },
        {
          label: 'Stream Color',
          type: 'Color',
          id: 'barsStreamColor'
        },
        {
          label: 'Active Color',
          type: 'Color',
          id: 'barsActiveColor'
        },
        {
          label: 'Height',
          type: 'Pixels',
          id: 'barsHeight'
        },
        {
          label: 'Rounded Corners',
          type: 'Pixels',
          id: 'barsRounded'
        }
      ]
    }
  ],
  defaults: {
    // Background
    backgroundColor: {
      type: 'hex',
      value: '#ffffff',
      opacity: 100
    },
    padding: '10px',
    useBorder: false,
    border: false,
    useCorners: false,
    corners: '0px',
    // Layout
    controlsPadding: '0px',
    playbackPadding: '0px',
    volumePadding: '0px',
    dividerColor: {
      type: 'hex',
      value: '#efefef',
      opacity: 100
    },
    // Progress and volume bars
    barsBackgroundColor: {
      type: 'hex',
      value: '#efefef',
      opacity: 100
    },
    barsStreamColor: {
      type: 'hex',
      value: '#e9e9e9',
      opacity: 100
    },
    barsActiveColor: {
      type: 'hex',
      value: '#333333',
      opacity: 100
    },
    barsHeight: 6,
    barsRounded: 3,
    dividerWidth: 1
  },
  rules: (props) => {
    const rules = {
      player: {
        backgroundColor: getColorString(props.backgroundColor),
        borderRadius: props.useCorners && props.corners,
        padding: props.padding
      },
      controls: {
        padding: props.controlsPadding
      },
      playback: {
        padding: props.playbackPadding
      },
      volume: {
        padding: props.volumePadding
      },
      bars: {
        backgroundColor: getColorString(props.barsBackgroundColor),
        height: props.barsHeight,
        borderRadius: props.barsRounded
      },
      stream: {
        backgroundColor: getColorString(props.barsStreamColor)
      },
      active: {
        backgroundColor: getColorString(props.barsActiveColor)
      },
      divider: {
        width: props.dividerWidth,
        backgroundColor: getColorString(props.dividerColor)
      }
    };

    if (props.useBorder) {
      Utils.applyBorders(rules.player, props.border);
    }

    return rules;
  }
};
