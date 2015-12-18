import * as adminActions from '../../client/actions/admin';

import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import Combobox from '../../components/data-types/combobox';

@connect(
  (state) => ({
    pages: state.pages.data.items
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class PagePickerContainer extends Component {
  static fragments = {
    pages: {
      _id: 1,
      title: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getAdmin(buildQueryAndVariables(this.constructor.fragments, {})).done();
  }

  render () {
    const labels = [];
    const values = [];

    forEach(this.props.pages, (page) => {
      labels.push(page.title);
      values.push(page._id);
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
