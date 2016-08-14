import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  (props) => ({
    fragments: {
      [props.type]: {
        _id: 1,
        title: 1
      }
    },
    mutations: {
      [`add${props.type.replace(/\b\w/g, l => l.toUpperCase()).slice(0, -1)}`]: [
        {
          type: 'PREPEND',
          field: props.type
        }
      ]
    }
  })
)
export default class TitablePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    white: PropTypes.bool,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render () {
    const {white, value, onChange, type, className} = this.props;
    const items = this.props[type] || [];
    const labels = [];
    const values = [];

    forEach(items, (item) => {
      labels.push(item.title);
      values.push(item._id);
    });

    return (
      <Combobox
        value={value}
        onChange={onChange}
        values={values}
        labels={labels}
        white={white}
        className={className}
      />
    );
  }
}
