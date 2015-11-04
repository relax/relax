import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Entry from './entry';
import {Droppable} from '../../../../../dnd';

export default class Structure extends Component {
  propTypes = {
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
          {this.props.data.map(this.renderEntry, this)}
        </Droppable>
      </div>
    );
  }

  renderEntry (entry) {
    return (
      <Entry
        entry={entry}
        key={entry.id}
        dnd={this.props.dnd}
        dndActions={this.props.dndActions}>
        {
          entry.children &&
          entry.children.constructor === Array &&
          entry.children.length > 0 &&
          entry.children.map(this.renderEntry, this)
        }
      </Entry>
    );
  }
}
