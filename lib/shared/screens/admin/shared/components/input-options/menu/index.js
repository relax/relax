import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: {
      menus: {
        _id: 1,
        title: 1
      }
    }
  })
)
export default class MenuPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired
  };

  static defaultProps = {
    menus: []
  };

  render () {
    const labels = [];
    const values = [];

    forEach(this.props.menus, (menu) => {
      labels.push(menu.title);
      values.push(menu._id);
    });

    return (
      <Combobox
        value={this.props.value}
        onChange={this.props.onChange}
        values={values}
        labels={labels}
      />
    );
  }
}
