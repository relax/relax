import * as pageBuilderActions from 'actions/page-builder';
import * as stylesMapActions from 'actions/styles-map';

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
    doc: state.pageBuilder.doc,
    selected: state.pageBuilder.selected,
    editing: state.pageBuilder.editing,
    stylesData: state.styles,
    editingSymbol: state.pageBuilder.symbolsEditing.length > 0
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    ...bindActionCreators(stylesMapActions, dispatch)
  })
)
export default class CanvasContainer extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    stylesData: PropTypes.array.isRequired,
    dragging: PropTypes.bool.isRequired,
    doc: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    selected: PropTypes.object,
    editing: PropTypes.bool.isRequired,
    template: PropTypes.object,
    editingSymbol: PropTypes.bool,
    updateStylesMap: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  render () {
    const {
      dragging,
      display,
      editingSymbol,
      elements,
      doc,
      selected,
      editing,
      stylesData,
      template,
      updateStylesMap,
      type
    } = this.props;

    return (
      <Canvas
        dragging={dragging}
        display={display}
        editingSymbol={editingSymbol}
        elements={elements}
        doc={doc}
        selected={selected}
        editing={editing}
        styles={stylesData}
        template={template}
        updateStylesMap={updateStylesMap}
        pageBuilderActions={this.props.pageBuilderActions}
        type={type}
      />
    );
  }
}
