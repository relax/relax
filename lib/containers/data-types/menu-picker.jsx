import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
  (state) => ({
    menus: state.menus.data.items
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class MenuPickerContainer extends Component {
  static fragments = {
    menus: {
      _id: 1,
      title: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  getInitState () {
    this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {})).done();
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
