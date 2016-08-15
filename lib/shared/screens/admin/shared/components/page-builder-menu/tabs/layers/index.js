import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Layers from './layers';

@connect(
  (state) => ({
    doc: state.pageBuilder.doc,
    template: state.pageBuilder.template,
    selected: state.pageBuilder.selected,
    selectedElement: state.pageBuilder.selectedElement,
    elements: state.pageBuilder.elements,
    expanded: state.pageBuilder.expanded,
    userExpanded: state.pageBuilder.userExpanded,
    overed: state.pageBuilder.overed,
    dragging: state.dnd.dragging,
    type: state.pageBuilder.type
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class LayersTabContainer extends Component {
  static propTypes = {
    doc: PropTypes.object,
    template: PropTypes.object,
    selected: PropTypes.object,
    selectedElement: PropTypes.object,
    elements: PropTypes.object,
    expanded: PropTypes.object,
    userExpanded: PropTypes.object,
    overed: PropTypes.object,
    dragging: PropTypes.bool,
    type: PropTypes.string,
    pageBuilderActions: PropTypes.object.isRequired
  };

  render () {
    return (
      <Layers {...this.props} />
    );
  }
}
