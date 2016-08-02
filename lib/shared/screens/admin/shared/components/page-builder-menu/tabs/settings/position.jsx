import bind from 'decorators/bind';
import getElementPosition from 'helpers/get-element-position';
import Component from 'components/component';
import OptionsList from 'components/options-list';
import React, {PropTypes} from 'react';

const positioningOptions = [
  {
    type: 'Columns',
    options: [
      {
        label: 'Top',
        type: 'Number',
        id: 'top',
        props: {
          allowed: ['px', '%', 'auto']
        }
      },
      {
        label: 'Right',
        type: 'Number',
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
        type: 'Number',
        id: 'bottom',
        props: {
          allowed: ['px', '%', 'auto']
        }
      },
      {
        label: 'Left',
        type: 'Number',
        id: 'left',
        props: {
          allowed: ['px', '%', 'auto']
        }
      }
    ]
  },
  {
    label: 'Z-index',
    type: 'Number',
    id: 'zIndex'
  }
];

export default class PositionSettings extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    selected: PropTypes.string,
    selectedElement: PropTypes.object
  };

  static options = [
    {
      label: 'Position',
      type: 'Select',
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
  ];

  @bind
  onChange (id, value) {
    const {selected} = this.props;
    const {changeElementPosition} = this.props.pageBuilderActions;
    changeElementPosition(selected.id, id, value, selected.context);
  }

  render () {
    const {selectedElement} = this.props;
    const values = selectedElement.position && getElementPosition(selectedElement, this.props.display) || {
      position: 'static'
    };
    return (
      <OptionsList
        options={PositionSettings.options}
        onChange={this.onChange}
        values={values}
      />
    );
  }
}
