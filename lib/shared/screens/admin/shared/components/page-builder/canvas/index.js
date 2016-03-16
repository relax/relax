import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updateColors} from 'helpers/colors';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Canvas from './canvas.jsx';

@dataConnect(
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
  }),
  () => ({
    fragments: {
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
    }
  })
)
export default class CanvasContainer extends Component {
  static propTypes = {
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

  render () {
    return (
      <Canvas {...this.props} />
    );
  }
}
