import * as adminActions from '../../client/actions/admin';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import FontPicker from '../../components/data-types/font-picker';

@connect(
  (state) => ({
    fonts: state.fonts.data
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class FontPickerContainer extends Component {
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  }

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    fonts: PropTypes.object.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  componentDidMount () {
    const vars = {
      settings: {
        ids: {
          value: ['fonts'],
          type: '[String]!'
        }
      }
    };

    this.props
      .getAdmin(buildQueryAndVariables(
        this.constructor.fragments,
        vars
      ))
      .done();
  }

  render () {
    return (
      <FontPicker
        value={this.props.value || {}}
        onChange={this.props.onChange}
        fonts={this.props.fonts}
      />
    );
  }
}
