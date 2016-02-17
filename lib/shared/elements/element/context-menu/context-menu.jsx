import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './context-menu.less';

export default class ContextMenu extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    addingSymbol: PropTypes.bool.isRequired,
    symbolTitle: PropTypes.string.isRequired,
    openAddingSymbol: PropTypes.func.isRequired,
    closeAddingSymbol: PropTypes.func.isRequired,
    onSymbolChange: PropTypes.func.isRequired,
    makeElementSymbol: PropTypes.func.isRequired,
    makeElementDynamic: PropTypes.func.isRequired,
    duplicateElement: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired
  };

  saveSymbol (event) {
    event.preventDefault();
    const {symbolTitle, makeElementSymbol, element} = this.props;

    if (this.props.symbolTitle) {
      makeElementSymbol(element.id, symbolTitle);
    } else {
      this.refs.titleInput.focus();
    }
  }

  makeDynamic (event) {
    event.preventDefault();
    const {makeElementDynamic, element} = this.props;
    makeElementDynamic(element.id);
  }

  duplicate (event) {
    event.preventDefault();
    const {duplicateElement, element} = this.props;
    duplicateElement(element.id);
  }

  remove (event) {
    event.preventDefault();
    const {removeElement, element} = this.props;
    removeElement(element.id);
  }

  render () {
    const {opened} = this.props;
    return opened ? this.renderOpened() : this.renderClosed();
  }

  renderOpened () {
    const {addingSymbol} = this.props;
    return addingSymbol ? this.renderAddingSymbol() : this.renderActions();
  }

  renderClosed () {
    return (
      <button className={styles.closed} onClick={this.props.open}>...</button>
    );
  }

  renderAddingSymbol () {
    const {closeAddingSymbol, symbolTitle, onSymbolChange} = this.props;
    return (
      <div className={styles.opened}>
        <div className='label back' onClick={closeAddingSymbol}>
          <i className='material-icons'>chevron_left</i>
          <span>Add to symbol library</span>
        </div>
        <form onSubmit={::this.saveSymbol}>
          <input className={styles.input} type='text' value={symbolTitle} onChange={onSymbolChange} placeholder='Name Symbol' ref='titleInput' />
          <div className={styles.saveButton} onClick={::this.saveSymbol}>Save</div>
          <input type='submit' hidden />
        </form>
      </div>
    );
  }

  renderActions () {
    const {close, element, openAddingSymbol} = this.props;
    return (
      <div className='element-context-menu' onMouseLeave={close}>
        <div className='label'>{element.label || element.tag}</div>
        <div className='element-context-action' onClick={openAddingSymbol}>Add to symbol library</div>
        <div className='element-context-action' onClick={::this.makeDynamic}>Make dynamic</div>
        <div className='element-context-action' onClick={::this.duplicate}>Duplicate</div>
        <div className='element-context-action' onClick={::this.remove}>Remove</div>
      </div>
    );
  }
}
