import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {Draggable} from '../../../../../dnd';

export default class Entry extends Component {
  static fragments = {
    page: {
      _id: 1,
      title: 1,
      slug: 1
    }
  }

  static propTypes = {
    entry: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  render () {
    const dragInfo = {
      type: 'new',
      entry: cloneDeep(this.props.entry)
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
      <Draggable dragInfo={dragInfo} dnd={this.props.dnd} dndActions={this.props.dndActions}>
        <div className='link-entry'>
          <i className='material-icons'>{icon}</i>
          <span className='title'>{label}</span>
          <span className='drag-icon'>
            <i className='material-icons'>more_vert</i>
            <i className='material-icons'>more_vert</i>
          </span>
        </div>
      </Draggable>
    );
  }
}
