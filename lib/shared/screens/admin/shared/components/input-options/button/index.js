import * as pageBuilderActionsArr from 'actions/page-builder';

import Button from 'components/button';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  (state) => ({
    selectedId: state.pageBuilder.selectedId
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActionsArr, dispatch)
  })
)
export default class ButtonContainer extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    action: PropTypes.string.isRequired,
    actionProps: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    selectedId: PropTypes.string
  };

  onClick (event) {
    event.preventDefault();
    const {action, actionProps, pageBuilderActions, selectedId} = this.props;

    if (action === 'addElement') {
      pageBuilderActions.addElementAt(actionProps, {
        id: selectedId,
        position: 0
      });
    } else if (action === 'linkData') {
      pageBuilderActions.linkDataMode(selectedId);
    } else if (action === 'linkFormData') {
      pageBuilderActions.linkFormDataMode(selectedId);
    }
  }

  render () {
    return (
      <Button full onClick={::this.onClick}>
        {this.props.label}
      </Button>
    );
  }
}
