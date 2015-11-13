import React from 'react';
import {Component} from 'relax-framework';

export default class Button extends Component {
  static propTypes = {
    label: React.PropTypes.node.isRequired,
    action: React.PropTypes.string.isRequired,
    actionProps: React.PropTypes.object.isRequired,
    pageBuilder: React.PropTypes.object.isRequired,
    pageBuilderActions: React.PropTypes.object.isRequired
  }

  onClick (event) {
    event.preventDefault();

    if (this.props.action === 'addElement') {
      this.props.pageBuilderActions.addElementAt(this.props.actionProps, {
        id: this.props.pageBuilder.selectedId,
        position: 0
      });
    } else if (this.props.action === 'linkData') {
      this.props.pageBuilderActions.linkDataMode(this.props.pageBuilder.selectedId);
    }
  }

  render () {
    return (
      <a href='#' className='button button-faded-grey full' onClick={this.onClick.bind(this)}>
        {this.props.label}
      </a>
    );
  }
}
