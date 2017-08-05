import * as pageBuilderActions from 'actions/page-builder';
import Component from 'components/component';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Settings from './settings';

@connect(
  (state) => ({
    selected: state.pageBuilder.selected,
    selectedElement: state.pageBuilder.selectedElement,
    type: state.pageBuilder.type,
    display: state.display,
    isTemplate: state.pageBuilder.selectedIsTemplate,
    selectedLinks: state.pageBuilder.selectedLinks || []
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class SettingsTabContainer extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    isTemplate: PropTypes.bool.isRequired,
    selected: PropTypes.object
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
