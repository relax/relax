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
    symbols: state.symbols,
    elements: state.pageBuilder.elements,
    pageData: state.pageBuilder.data,
    selectedId: state.pageBuilder.selectedId,
    editing: state.pageBuilder.editing,
    stylesData: state.styles.data
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
    templateData: PropTypes.object
  };

  render () {
    const {
      dragging,
      display,
      symbols,
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
        symbols={symbols}
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
