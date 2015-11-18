import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Breadcrumbs extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  entryClicked (id, event) {
    event.preventDefault();
    const {selectElement} = this.props.pageBuilderActions;
    selectElement(id);
  }

  render () {
    const {selectedPath, selectedElement} = this.props.pageBuilder;
    return (
      <div className='selected-breadcrumbs'>
        {selectedPath && selectedPath.map(this.renderPathEntry, this)}
        <span className='current' key='current'>{(selectedElement && (selectedElement.label || selectedElement.tag)) || 'body'}</span>
      </div>
    );
  }

  renderPathEntry (entry) {
    return (
      <span key={entry.id}>
        <a href='#' onClick={this.entryClicked.bind(this, entry.id)}>{entry.label || entry.tag}</a>
        <span> > </span>
      </span>
    );
  }
}
