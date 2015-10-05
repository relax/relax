import {Component} from 'relax-framework';
import React from 'react';
import cloneDeep from 'lodash.clonedeep';

import {Draggable} from '../../../../../drag';

export default class Entry extends Component {
  render () {
    const dragInfo = {
      type: 'new',
      entry: cloneDeep(this.props.entry)
    };

    let label, icon;
    if (this.props.entry.type === 'page') {
      label = this.props.entry.page.title;
      icon = 'insert_drive_file';
    } else if (this.props.entry.type === 'link') {
      label = this.props.entry.link.label;
      icon = 'link';
    }

    return (
      <Draggable dragInfo={dragInfo}>
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

Entry.propTypes = {
  entry: React.PropTypes.object.isRequired
};
