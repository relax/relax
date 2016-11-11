import bind from 'decorators/bind';
import cx from 'classnames';
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
    removeElement: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired,
    linkingDataMode: PropTypes.bool
  };

  @bind
  saveSymbol (event) {
    event.preventDefault();
    const {symbolTitle, makeElementSymbol, element, context} = this.props;

    if (this.props.symbolTitle) {
      makeElementSymbol(element.id, symbolTitle, context);
    } else {
      this.refs.titleInput.focus();
    }
  }

  @bind
  makeDynamic (event) {
    event.preventDefault();
    const {makeElementDynamic, element, context} = this.props;
    makeElementDynamic(element.id, context);
  }

  @bind
  duplicate (event) {
    event.preventDefault();
    const {duplicateElement, element, context} = this.props;
    duplicateElement(element.id, context);
  }

  @bind
  remove (event) {
    event.preventDefault();
    const {removeElement, element, context} = this.props;
    removeElement(element.id, context);
  }

  isSymbol () {
    const {element} = this.props;
    return element.tag === 'Symbol';
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
    const {linkingDataMode} = this.props;

    return (
      <button
        className={cx(
          styles.closed,
          this.isSymbol() && styles.symbol,
          linkingDataMode && styles.linking
        )}
        onClick={this.props.open}
      >
        <i className='nc-icon-mini ui-2_menu-dots'></i>
      </button>
    );
  }

  renderAddingSymbol () {
    const {closeAddingSymbol, symbolTitle, onSymbolChange} = this.props;
    return (
      <div className={styles.opened}>
        <button className={styles.label} onClick={closeAddingSymbol}>
          <i className='nc-icon-mini arrows-1_minimal-left'></i>
          <span>Add to symbol library</span>
        </button>
        <form className={styles.form} onSubmit={this.saveSymbol}>
          <input
            className={styles.input}
            type='text'
            value={symbolTitle}
            onChange={onSymbolChange}
            placeholder='Name Symbol'
            ref='titleInput'
          />
          <div className={styles.saveButton} onClick={this.saveSymbol}>Save</div>
          <input type='submit' hidden />
        </form>
      </div>
    );
  }

  renderActions () {
    const {close, element, openAddingSymbol, linkingDataMode} = this.props;
    const isSymbol = this.isSymbol();
    return (
      <div
        className={cx(
          styles.opened,
          isSymbol && styles.symbol,
          linkingDataMode && styles.linking
        )}
        onMouseLeave={close}
      >
        <div className={styles.label}>{element.label || element.tag}</div>
        {
          !isSymbol &&
          <div className={styles.action} onClick={openAddingSymbol}>Add to symbol library</div>
        }
        {
          !isSymbol &&
          <div className={styles.action} onClick={this.makeDynamic}>Make dynamic</div>
        }
        <div className={styles.action} onClick={this.duplicate}>Duplicate</div>
        <div className={styles.action} onClick={this.remove}>Remove</div>
      </div>
    );
  }
}
