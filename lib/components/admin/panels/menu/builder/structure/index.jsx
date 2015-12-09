import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';
import {Droppable} from '../../../../../dnd';

export default class Structure extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className='menu-builder-structure'>
        <Droppable
          dropInfo={{id: 'base'}}
          placeholder
          placeholderContent={'Drop links here'}
          minHeight={7}
          dnd={this.props.dnd}
          dndActions={this.props.dndActions}>
          {this.props.data.map(this.renderEntry.bind(this, 'base'))}
        </Droppable>
      </div>
    );
  }

  renderEntry (parentId, entry, key) {
    return (
      <Entry
        entry={entry}
        parentId={parentId}
        positionInParent={key}
        key={entry.id}
        dnd={this.props.dnd}
        dndActions={this.props.dndActions}>
        {
          entry.children &&
          entry.children.constructor === Array &&
          entry.children.length > 0 &&
          entry.children.map(this.renderEntry.bind(this, entry.id))
        }
      </Entry>
    );
  }
}
