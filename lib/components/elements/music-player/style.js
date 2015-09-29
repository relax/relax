import {Types} from '../../../data-types';
import Colors from '../../../colors';
import Utils from '../../../utils';

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
          type: Types.Color,
          id: 'backgroundColor'
        },
        {
          label: 'Padding',
          type: Types.Padding,
          id: 'padding'
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
      label: 'Layout',
      type: 'Section',
      id: 'layoutSection',
      unlocks: [
        {
          label: 'Controls area padding',
          type: Types.Padding,
          id: 'controlsPadding'
        },
        {
          label: 'Playback area padding',
          type: Types.Padding,
          id: 'playbackPadding'
        },
        {
          label: 'Volume area padding',
          type: Types.Padding,
          id: 'volumePadding'
        },
        {
          label: 'Divider Width',
          type: Types.Pixels,
          id: 'dividerWidth'
        },
        {
          label: 'Divider Color',
          type: Types.Color,
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
          type: Types.Color,
          id: 'barsBackgroundColor'
        },
        {
          label: 'Stream Color',
          type: Types.Color,
          id: 'barsStreamColor'
        },
        {
          label: 'Active Color',
          type: Types.Color,
          id: 'barsActiveColor'
        },
        {
          label: 'Height',
          type: Types.Pixels,
          id: 'barsHeight'
        },
        {
          label: 'Rounded Corners',
          type: Types.Pixels,
          id: 'barsRounded'
        }
      ]
    }
  ],
  defaults: {
    backgroundColor: {
      value: '#333333',
      opacity: 100
    },
    padding: '10px',
    useBorder: false,
    border: false,
    useCorners: false,
    corners: '0px',
    controlsPadding: '0px',
    playbackPadding: '0px',
    volumePadding: '0px',
    barsBackgroundColor: {
      value: '#333333',
      opacity: 100
    },
    barsStreamColor: {
      value: '#666666',
      opacity: 100
    },
    barsActiveColor: {
      value: '#cccccc',
      opacity: 100
    },
    barsHeight: 6,
    barsRounded: 3,
    dividerWidth: 1,
    dividerColor: {
      value: '#3A3A3A',
      opacity: 100
    }
  },
  rules: (props) => {
    let rules = {
      player: {
        backgroundColor: Colors.getColorString(props.backgroundColor),
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
        backgroundColor: Colors.getColorString(props.barsBackgroundColor),
        height: props.barsHeight,
        borderRadius: props.barsRounded
      },
      stream: {
        backgroundColor: Colors.getColorString(props.barsStreamColor)
      },
      active: {
        backgroundColor: Colors.getColorString(props.barsActiveColor)
      },
      divider: {
        width: props.dividerWidth,
        backgroundColor: Colors.getColorString(props.dividerColor)
      }
    };

    if (props.useBorder) {
      Utils.applyBorders(rules.player, props.border);
    }

    return rules;
  }
};
