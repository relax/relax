import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Edit extends Component {
  static propTypes = {
    shadow: PropTypes.object.isRequired,
    changeShadow: PropTypes.func.isRequired,
    OptionsList: PropTypes.object.isRequired
  };

  static options = [
    {
      type: 'Columns',
      options: [
        {
          label: 'Color',
          type: 'Color',
          id: 'color'
        },
        {
          label: 'Blur',
          type: 'Pixels',
          id: 'blur'
        }
      ]
    },
    {
      type: 'Columns',
      options: [
        {
          label: 'X',
          type: 'Pixels',
          id: 'x'
        },
        {
          label: 'Y',
          type: 'Pixels',
          id: 'y'
        }
      ]
    }
  ];

  render () {
    const {shadow, OptionsList, changeShadow} = this.props;

    return (
      <div>
        <OptionsList white tight options={Edit.options} values={shadow} onChange={changeShadow} />
      </div>
    );
  }
}
