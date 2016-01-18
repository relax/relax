import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class ContextMenu extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      addingSymbol: false,
      symbolTitle: ''
    };
  }

  addSymbol () {
    this.setState({
      addingSymbol: true
    });
  }

  closeAddingSymbol () {
    this.setState({
      addingSymbol: false
    });
  }

  onSymbolChange (event) {
    this.setState({
      symbolTitle: event.target.value
    });
  }

  saveSymbol (event) {
    event.preventDefault();

    if (this.state.symbolTitle) {
      const {makeElementSymbol} = this.props.pageBuilderActions;
      const {selectedId} = this.props.pageBuilder;
      makeElementSymbol(selectedId, this.state.symbolTitle);
    } else {
      this.refs.titleInput.focus();
    }
  }

  makeDynamic (event) {
    event.preventDefault();
    const {makeElementDynamic} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    makeElementDynamic(selectedId);
  }

  duplicate (event) {
    event.preventDefault();
    const {duplicateElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    duplicateElement(selectedId);
  }

  remove (event) {
    event.preventDefault();
    const {removeElement} = this.props.pageBuilderActions;
    const {selectedId} = this.props.pageBuilder;
    removeElement(selectedId);
  }

  render () {
    let result;

    if (this.state.addingSymbol) {
      result = (
        <div className='element-context-menu'>
          <div className='label back' onClick={::this.closeAddingSymbol}>
            <i className='material-icons'>chevron_left</i>
            <span>Add to symbol library</span>
          </div>
          <form onSubmit={::this.saveSymbol}>
            <input className='input-title' type='text' value={this.state.symbolTitle} onChange={::this.onSymbolChange} placeholder='Name Symbol' ref='titleInput' />
            <div className='save-symbol' onClick={::this.saveSymbol}>Save</div>
            <input type='submit' hidden />
          </form>
        </div>
      );
    } else {
      result = (
        <div className='element-context-menu' onMouseLeave={this.props.onClose}>
          <div className='label'>{this.props.element.label || this.props.element.tag}</div>
          <div className='element-context-action' onClick={::this.addSymbol}>Add to symbol library</div>
          <div className='element-context-action' onClick={::this.makeDynamic}>Make dynamic</div>
          <div className='element-context-action' onClick={::this.duplicate}>Duplicate</div>
          <div className='element-context-action' onClick={::this.remove}>Remove</div>
        </div>
      );
    }

    return result;
  }
}
