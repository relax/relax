import React from 'react';
import {Component} from 'relax-framework';

export default class Breadcrumbs extends Component {
  entryClicked (id, event) {
    event.preventDefault();
    this.context.selectElement(id);
  }

  renderPathEntry (entry) {
    return (
      <span key={entry.id}>
        <a href='#' onClick={this.entryClicked.bind(this, entry.id)}>{entry.label || entry.tag}</a>
        <span> > </span>
      </span>
    );
  }

  render () {
    return (
      <div className='selected-breadcrumbs'>
        {this.context.selectedPath.map(this.renderPathEntry, this)}
        <span className='current' key='current'>{this.context.selected.label || this.context.selected.tag || 'body'}</span>
      </div>
    );
  }
}

Breadcrumbs.contextTypes = {
  selected: React.PropTypes.any.isRequired,
  selectedPath: React.PropTypes.array.isRequired,
  selectElement: React.PropTypes.func.isRequired
};
