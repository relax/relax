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
    pageBuilderActions: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    stylesData: PropTypes.array.isRequired,
    symbols: PropTypes.object.isRequired,
    dragging: PropTypes.bool.isRequired,
    pageData: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    selectedId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
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
    const {
      dragging,
      display,
      symbols,
      elements,
      pageData,
      selectedId,
      editing,
      stylesData
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
        pageBuilderActions={this.props.pageBuilderActions}
      />
    );
  }
}
