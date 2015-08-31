import React from 'react';
import {Component} from 'relax-framework';
import Props from './props';
import GeminiScrollbar from 'react-gemini-scrollbar';

export default class EditTab extends Component {
  duplicate (event) {
    event.preventDefault();
    this.context.duplicateElement(this.context.selected.id);
  }

  remove (event) {
    event.preventDefault();
    this.context.removeElement(this.context.selected.id);
  }

  renderTab () {
    return <Props />;
  }

  renderNonSelected () {
    return (
      <h6 className='none'>You don't have any element selected</h6>
    );
  }

  renderActionButtons () {
    if (this.context.selected && this.context.selected !== 'body') {
      if (this.context.selected.subComponent) {
        return (
          <div className='actions'>
            <span>This is a sub element</span>
          </div>
        );
      } else {
        return (
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
    }
  }

  render () {
    return (
      <div className='settings-tab'>
        <div className='content-scrollable'>
          <GeminiScrollbar autoshow={true}>
            <div className='edit-tab'>
              {this.context.selected && this.context.selected !== 'body' ? this.renderTab() : this.renderNonSelected()}
            </div>
          </GeminiScrollbar>
        </div>
        {this.renderActionButtons()}
      </div>
    );
  }
}

EditTab.contextTypes = {
  selected: React.PropTypes.any.isRequired,
  duplicateElement: React.PropTypes.func.isRequired,
  removeElement: React.PropTypes.func.isRequired
};
