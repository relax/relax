import * as pageBuilderActions from 'actions/page-builder';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updateColors} from 'helpers/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Canvas from './canvas.jsx';

@dataConnect()
@connect(
  (state) => ({
    dragging: state.dnd.dragging,
    styles: state.styles.data,
    display: state.display,
    symbols: state.symbols,
    colors: state.colors.data,
    elements: state.pageBuilder.elements,
    pageData: state.pageBuilder.data,
    selectedId: state.pageBuilder.selectedId,
    editing: state.pageBuilder.editing
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class CanvasContainer extends Component {
  static fragments = {
    colors: {
      _id: 1,
      label: 1,
      value: 1
    },
    styles: {
      _id: 1,
      title: 1,
      type: 1,
      options: 1
    }
  };

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired
  };

  getInitState () {
    updateColors(this.props.colors);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.colors !== nextProps.colors) {
      updateColors(nextProps.colors);
    }
  }

  initialize () {
    this.props.fetchData({
      fragments: CanvasContainer.fragments
    });
  }

  render () {
    return (
      <Canvas {...this.props} />
    );
  }
}
