import {Component} from 'relax-framework';
import React from 'react';

import Entry from './entry';
import {Droppable} from '../../../../../drag';

export default class Structure extends Component {
  renderEntry (entry) {
    return (
      <Entry entry={entry} key={entry.id}>
        {
          entry.children &&
          entry.children.constructor === Array &&
          entry.children.length > 0 &&
          entry.children.map(this.renderEntry, this)
        }
      </Entry>
    );
  }

  render () {
    return (
      <div className='menu-builder-structure'>
        <Droppable dropInfo={{id: 'base'}} placeholder={true} placeholderContent={'Drop links here'} minHeight={7}>
          {this.props.data.map(this.renderEntry, this)}
        </Droppable>
      </div>
    );
  }
}
