import dataConnect from 'decorators/data-connector';
import forEach from 'lodash.foreach';
import Combobox from 'components/input-options/combobox';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

@dataConnect()
@connect(
  (state) => ({
    menus: state.menus.data.items
  })
)
export default class MenuPickerContainer extends Component {
  static fragments = {
    menus: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  getInitState () {
    this.props.fetchData({
      fragments: this.constructor.fragments
    });
  }

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
