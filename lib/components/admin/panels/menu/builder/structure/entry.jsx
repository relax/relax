import React from 'react';
import {Component} from 'relax-framework';

import {Droppable, Draggable} from '../../../../../dnd';

export default class Entry extends Component {
  propTypes = {
    entry: React.PropTypes.object.isRequired
  }

  contextTypes = {
    dragging: React.PropTypes.bool.isRequired,
    onEntryRemove: React.PropTypes.func.isRequired
  }

  onRemove (event) {
    event.preventDefault();
    this.context.onEntryRemove(this.props.entry.id);
  }

  render () {
    const dragInfo = {
      type: 'move',
      id: this.props.entry.id
    };

    let label;
    let icon;
    if (this.props.entry.type === 'page') {
      label = this.props.entry.page.title;
      icon = 'insert_drive_file';
    } else if (this.props.entry.type === 'link') {
      label = this.props.entry.link.label;
      icon = 'link';
    }

    return (
      <Draggable dragInfo={dragInfo}>
        <div className='menu-structure-entry'>
          <div className='link-entry'>
            <i className='material-icons'>{icon}</i>
            <span className='title'>{label}</span>
            <span className='remove' onClick={this.onRemove.bind(this)}>
              <i className='material-icons'>delete</i>
            </span>
            <span className='drag-icon'>
              <i className='material-icons'>more_vert</i>
              <i className='material-icons'>more_vert</i>
            </span>
          </div>
          <div className='sub'>
            <Droppable dropInfo={this.props.entry} minHeight={7} placeholder={this.context.dragging} placeholderContent='Drop sub link'>
              {this.props.children}
            </Droppable>
          </div>
        </div>
      </Draggable>
    );
  }
}
