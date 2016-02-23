import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Settings from './settings';

@connect(
  (state) => ({
    selectedId: state.pageBuilder.selectedId,
    selectedElement: state.pageBuilder.selectedElement,
    elements: state.pageBuilder.elements,
    display: state.display
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class SettingsTabContainer extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    selectedId: PropTypes.string
  };

  duplicate () {
    const {selectedId} = this.props;
    const {duplicateElement} = this.props.pageBuilderActions;
    duplicateElement(selectedId);
  }

  remove () {
    const {removeElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props;
    removeElement(selectedId);
  }

  render () {
    return (
      <Settings
        {...this.props}
        duplicate={::this.duplicate}
        remove={::this.remove}
      />
    );
  }
}
