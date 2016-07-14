import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Canvas from './canvas.jsx';

@connect(
  (state) => ({
    dragging: state.dnd.dragging,
    display: state.display,
    elements: state.pageBuilder.elements,
    pageData: state.pageBuilder.data,
    selectedId: state.pageBuilder.selectedId,
    editing: state.pageBuilder.editing,
    stylesData: state.styles.data,
    editingSymbol: state.pageBuilder.symbolsEditing.length > 0
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class CanvasContainer extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    stylesData: PropTypes.array.isRequired,
    symbols: PropTypes.object.isRequired,
    dragging: PropTypes.bool.isRequired,
    pageData: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    templateData: PropTypes.object,
    editingSymbol: PropTypes.bool
  };

  render () {
    const {
      dragging,
      display,
      editingSymbol,
      elements,
      pageData,
      selectedId,
      editing,
      stylesData,
      templateData
    } = this.props;

    return (
      <Canvas
        dragging={dragging}
        display={display}
        editingSymbol={editingSymbol}
        elements={elements}
        pageData={pageData}
        selectedId={selectedId}
        editing={editing}
        styles={stylesData}
        templateData={templateData}
        pageBuilderActions={this.props.pageBuilderActions}
      />
    );
  }
}
