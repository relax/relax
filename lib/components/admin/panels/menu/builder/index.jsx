import React, {PropTypes} from 'react';
import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import {DragRoot} from '../../../../drag';
import Sidebar from './sidebar';
import Structure from './structure';

export default class Builder extends DragRoot {
  static fragments = Sidebar.fragments

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    pages: PropTypes.array.isRequired
  }

  static childContextTypes = {
    onEntryRemove: React.PropTypes.func.isRequired,
    onStartDrag: React.PropTypes.func.isRequired,
    dragging: React.PropTypes.bool.isRequired
  }

  getInitialState () {
    this.onStartDragBind = this.onStartDrag.bind(this);
    this.onEntryRemoveBind = this.onEntryRemove.bind(this);

    return {
      dragging: false
    };
  }

  getChildContext () {
    return {
      onEntryRemove: this.onEntryRemoveBind,
      onStartDrag: this.onStartDragBind,
      dragging: this.state.dragging
    };
  }

  forEachEntry (entries, callback) {
    forEach(entries, (entry, index) => {
      callback(entry);

      if (entry.children && entry.children.length) {
        this.forEachEntry(entry.children, callback);
      }
    });
  }

  checkLatestId (data) {
    var max = 0;

    this.forEachEntry(data, (entry) => {
      if (entry.id > max) {
        max = entry.id;
      }
    });

    return max;
  }

  findById (data, id, remove = false, parentId = 'base') {
    let result = false;
    forEach(data, (entry, key) => {
      if (entry.id === id) {
        if (remove) {
          result = {
            entry: (data.splice(key, 1))[0],
            parentId,
            position: key
          };
        } else {
          result = {
            entry,
            parentId,
            position: key
          };
        }
      } else if (entry.children) {
        result = this.findById(entry.children, id, remove, entry.id);
      }

      if (result !== false) {
        return false;
      }
    });

    return result;
  }

  draggedComponent (dragReport) {
    const dataDuplicate = cloneDeep(this.props.data);

    const dragInfo = dragReport.dragInfo;
    const dropInfo = dragReport.dropInfo;

    // dropped no where
    if (!dropInfo || !dragInfo) {
      return;
    }

    let entry;
    let position = typeof dropInfo.position !== 'undefined' ? dropInfo.position : 0;

    // dragging element
    if (dragInfo.type === 'new') {
      entry = cloneDeep(dragInfo.entry);
      entry.id = this.checkLatestId(dataDuplicate) + 1;
    } else if (dragInfo.type === 'move') {
      const info = this.findById(dataDuplicate, dragInfo.id, true);
      entry = info.entry;

      if (info.parentId === dropInfo.id && position > info.position) {
        position --;
      }
    }

    // destination
    if (dropInfo.id === 'base') {
      dataDuplicate.splice(position, 0, entry);
    } else {
      const destination = this.findById(dataDuplicate, dropInfo.id).entry;
      destination.children = destination.children || [];
      destination.children.splice(position, 0, entry);
    }

    this.props.onChange(dataDuplicate);
  }

  onEntryRemove (id) {
    const dataDuplicate = cloneDeep(this.props.data);
    this.findById(dataDuplicate, id, true);
    this.props.onChange(dataDuplicate);
  }

  render () {
    return (
      <div className={this.state.dragging && 'dragging'}>
        <div className='menu-builder'>
          <Sidebar pages={this.props.pages} />
          <Structure data={this.props.data} />
        </div>
        {this.renderDragger()}
      </div>
    );
  }
}
