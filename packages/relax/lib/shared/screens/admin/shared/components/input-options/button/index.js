import * as pageBuilderActionsArr from 'actions/page-builder';

import bind from 'decorators/bind';
import Button from 'components/button';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  (state) => ({
    selected: state.pageBuilder.selected
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
    selected: PropTypes.object
  };

  @bind
  onClick (event) {
    event.preventDefault();
    const {action, actionProps, pageBuilderActions, selected} = this.props;

    if (action === 'addElement') {
      pageBuilderActions.addElementAt(actionProps, {
        id: selected.id,
        context: selected.context,
        position: 0
      });
    } else if (action === 'linkData') {
      pageBuilderActions.linkDataMode(selected.id, selected.context);
    } else if (action === 'linkFormData') {
      pageBuilderActions.linkFormDataMode(selected.id, selected.context);
    }
  }

  render () {
    return (
      <Button full onClick={this.onClick}>
        {this.props.label}
      </Button>
    );
  }
}
