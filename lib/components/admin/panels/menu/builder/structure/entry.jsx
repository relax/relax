import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {Droppable, Draggable} from '../../../../../dnd';

export default class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    parentId: PropTypes.string.isRequired,
    positionInParent: PropTypes.number.isRequired,
    children: PropTypes.node
  }

  static contextTypes = {
    onEntryRemove: React.PropTypes.func.isRequired
  }

  onRemove (event) {
    event.preventDefault();
    this.context.onEntryRemove(this.props.entry.id);
  }

  render () {
    const dragInfo = {
      type: 'move',
      id: this.props.entry.id,
      parentId: this.props.parentId,
      positionInParent: this.props.positionInParent
    };

    let label;
    let icon;
    if (this.props.entry.type === 'page') {
      label = this.props.entry.page && this.props.entry.page.title || '(Removed page)';
      icon = 'insert_drive_file';
    } else if (this.props.entry.type === 'link') {
      label = this.props.entry.link.label;
      icon = 'link';
    }

    return (
      <Draggable dragInfo={dragInfo} dnd={this.props.dnd} dndActions={this.props.dndActions}>
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
            <Droppable
              dropInfo={{
                id: this.props.entry.id
              }}
              minHeight={7}
              placeholder={this.props.dnd.dragging}
              placeholderContent='Drop sub link'
              hidePlaceholder
              dnd={this.props.dnd}
              dndActions={this.props.dndActions}>
              {this.props.children}
            </Droppable>
          </div>
        </div>
      </Draggable>
    );
  }
}
