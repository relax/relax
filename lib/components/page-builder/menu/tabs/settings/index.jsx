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
    // this.context.duplicateElement(this.context.selected.id);
  }

  remove (event) {
    event.preventDefault();
    // this.context.removeElement(this.context.selected.id);
  }

  render () {
    const {selected} = this.props.pageBuilder;
    return (
      <div className='settings-tab'>
        <div className='content-scrollable'>
          <GeminiScrollbar autoshow>
            <div className='edit-tab'>
              {selected && selected !== 'body' ? this.renderTab() : this.renderNonSelected()}
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
    const {selected} = this.props.pageBuilder;
    if (selected && selected !== 'body') {
      let result;
      if (selected.subComponent) {
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
