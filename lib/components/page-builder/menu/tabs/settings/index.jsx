import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Props from './props';

export default class EditTab extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  duplicate (event) {
    event.preventDefault();
    const {duplicateElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    duplicateElement(selectedId);
  }

  remove (event) {
    event.preventDefault();
    const {removeElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    removeElement(selectedId);
  }

  render () {
    const {selectedId} = this.props.pageBuilder;
    return (
      <div className='settings-tab'>
        <div className='content-scrollable'>
          <GeminiScrollbar autoshow>
            <div className='edit-tab'>
              {selectedId && selectedId !== 'body' ? this.renderTab() : this.renderNonSelected()}
            </div>
          </GeminiScrollbar>
        </div>
        {this.renderActionButtons()}
      </div>
    );
  }

  renderTab () {
    return <Props {...this.props} />;
  }

  renderNonSelected () {
    return (
      <h6 className='none'>You don't have any element selected</h6>
    );
  }

  renderActionButtons () {
    const {selectedId, selectedElement} = this.props.pageBuilder;
    if (selectedId && selectedId !== 'body') {
      let result;
      if (selectedElement.subComponent) {
        result = (
          <div className='actions'>
            <span>This is a sub element</span>
          </div>
        );
      } else {
        result = (
          <div className='actions'>
            <a href='#' onClick={this.duplicate.bind(this)}>
              <i className='material-icons'>content_copy</i>
              <span>Duplicate</span>
            </a>
            <a href='#' onClick={this.remove.bind(this)}>
              <i className='material-icons'>delete</i>
              <span>Remove</span>
            </a>
          </div>
        );
      }
      return result;
    }
  }
}
