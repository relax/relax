import * as colorsActions from '../../client/actions/colors';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Colors from '../../components/admin/panels/colors';

@connect(
  (state) => ({
    colors: state.colors.data
  }),
  (dispatch) => bindActionCreators(colorsActions, dispatch)
)
export default class ColorsContainer extends Component {
  static fragments = Colors.fragments

  static panelSettings = {
    activePanelType: 'colors',
    breadcrumbs: [
      {
        label: 'Colors'
      }
    ]
  }

  static propTypes = {
    colors: React.PropTypes.array,
    addColor: React.PropTypes.func,
    updateColor: React.PropTypes.func,
    removeColor: React.PropTypes.func
  }

  getInitState () {
    return {
      edit: false,
      editingColor: false
    };
  }

  onAddNew (event) {
    event.preventDefault();

    this.setState({
      edit: true,
      editingColor: false
    });
  }

  onClose () {
    this.setState({
      edit: false,
      editingColor: false
    });
  }

  onEdit (color) {
    this.setState({
      edit: true,
      editingColor: color
    });
  }

  render () {
    return (
      <Colors
        {...this.props}
        {...this.state}
        onAddNew={::this.onAddNew}
        onClose={::this.onClose}
        onEdit={::this.onEdit}
      />
    );
  }
}
