import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import OptionsList from '../../../../options-list';
import {Types} from '../../../../../data-types';

const positioningOptions = [
  {
    type: 'Columns',
    options: [
      {
        label: 'Top',
        type: Types.Number,
        id: 'top',
        props: {
          allowed: ['px', '%', 'auto']
        }
      },
      {
        label: 'Right',
        type: Types.Number,
        id: 'right',
        props: {
          allowed: ['px', '%', 'auto']
        }
      }
    ]
  },
  {
    type: 'Columns',
    options: [
      {
        label: 'Bottom',
        type: Types.Number,
        id: 'bottom',
        props: {
          allowed: ['px', '%', 'auto']
        }
      },
      {
        label: 'Left',
        type: Types.Number,
        id: 'left',
        props: {
          allowed: ['px', '%', 'auto']
        }
      }
    ]
  },
  {
    label: 'Z-index',
    type: Types.Number,
    id: 'zIndex'
  }
];

export default class PositionSettings extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  static options = [
    {
      label: 'Position',
      type: Types.Select,
      id: 'position',
      props: {
        labels: ['Static', 'Relative', 'Absolute', 'Fixed'],
        values: ['static', 'relative', 'absolute', 'fixed']
      },
      unlocks: {
        relative: positioningOptions,
        absolute: positioningOptions,
        fixed: positioningOptions
      }
    }
  ]

  onChange (id, value) {
    const {selectedId} = this.props.pageBuilder;
    const {changeElementPosition} = this.props.pageBuilderActions;
    changeElementPosition(selectedId, id, value);
  }

  render () {
    const {selectedElement} = this.props.pageBuilder;
    const values = selectedElement.position || {
      position: 'static'
    };
    return (
      <OptionsList options={PositionSettings.options} onChange={this.onChange.bind(this)} values={values} />
    );
  }
}
