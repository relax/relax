import * as pageBuilderActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Settings from './settings';

@connect(
  (state) => ({
    selected: state.pageBuilder.selected,
    selectedElement: state.pageBuilder.selectedElement,
    type: state.pageBuilder.type,
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
    selected: PropTypes.string
  };

  @bind
  duplicate () {
    const {selected} = this.props;
    const {duplicateElement} = this.props.pageBuilderActions;
    duplicateElement(selected.id, selected.context);
  }

  @bind
  remove () {
    const {removeElement} = this.props.pageBuilderActions;
    const {selected} = this.props;
    removeElement(selected.id, selected.context);
  }

  render () {
    return (
      <Settings
        {...this.props}
        duplicate={this.duplicate}
        remove={this.remove}
      />
    );
  }
}
