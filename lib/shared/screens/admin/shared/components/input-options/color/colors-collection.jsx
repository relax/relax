import Component from 'components/component';
import Input from 'components/input-options/input';
import ModalDelete from 'components/modal-delete';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Color from './color';
import styles from './colors-collection.less';

export default class ColorsCollection extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    colr: PropTypes.object,
    selectColor: PropTypes.func.isRequired,
    addingColor: PropTypes.bool.isRequired,
    addingColorName: PropTypes.string.isRequired,
    changeAddingColor: PropTypes.func.isRequired,
    toggleAddingColor: PropTypes.func.isRequired,
    removeConfirm: PropTypes.bool,
    addColor: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    editingSelected: PropTypes.array.isRequired,
    editingSelectedColor: PropTypes.object,
    editingColor: PropTypes.bool.isRequired,
    editingColorName: PropTypes.string.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    toggleEditingSelectedColor: PropTypes.func.isRequired,
    toggleEditingColor: PropTypes.func.isRequired,
    changeEditingColorName: PropTypes.func.isRequired,
    removeSelectedColors: PropTypes.func.isRequired,
    updateSelectedName: PropTypes.func.isRequired,
    cancelSelectedColorEdit: PropTypes.func.isRequired,
    updateSelectedColorEdit: PropTypes.func.isRequired,
    toggleRemoveConfirm: PropTypes.func.isRequired
  };

  @bind
  onSubmit (event) {
    const {addingColor, addColor, updateSelectedName} = this.props;
    event.preventDefault();

    if (addingColor) {
      addColor();
    } else {
      updateSelectedName();
    }
  }

  render () {
    const {colors, editing, toggleEditing} = this.props;

    return (
      <div className={styles.root}>
        <div>
          <div className={cx(styles.label, styles.editButton)} onClick={toggleEditing}>
            {editing ? 'Done' : 'Edit'}
          </div>
          <div className={styles.label}>Color Collection</div>
        </div>
        <div>
          {colors.map(this.renderColor, this)}
          {this.renderAddNew()}
        </div>
        {this.renderAdding()}
        {this.renderEditing()}
      </div>
    );
  }

  renderAddNew () {
    const {editing} = this.props;

    if (!editing) {
      return (
        <span className={styles.addButton} key='add' onClick={this.props.toggleAddingColor}>
          <i className='nc-icon-mini ui-1_simple-add'></i>
        </span>
      );
    }
  }

  renderColor (color) {
    const {
      editing,
      selectColor,
      colr,
      toggleEditingSelectedColor,
      editingSelected,
      editingSelectedColor
    } = this.props;
    const selected = editing && editingSelected.indexOf(color._id) !== -1;
    let resultColor = color;

    if (selected && editingSelectedColor) {
      resultColor = Object.assign({}, color, {
        value: colr.toHex()
      });
    }

    return (
      <Color
        color={resultColor}
        key={color._id}
        selectColor={editing ? toggleEditingSelectedColor : selectColor}
        selected={selected}
        disabled={editing && !selected && editingSelectedColor}
      />
    );
  }

  renderAdding () {
    const {
      addingColor,
      addingColorName,
      changeAddingColor,
      editingColor,
      editingColorName,
      changeEditingColorName
    } = this.props;

    if (addingColor || editingColor) {
      return (
        <form className={styles.adding} onSubmit={this.onSubmit}>
          <Input
            className={styles.input}
            placeholder='Color name'
            white
            value={addingColor ? addingColorName : editingColorName}
            onChange={addingColor ? changeAddingColor : changeEditingColorName}
            focused
          />
          <div className={styles.saveButton} onClick={this.onSubmit}>
            Save
          </div>
        </form>
      );
    }
  }

  renderEditing () {
    const {
      editing,
      editingColor,
      editingSelected,
      editingSelectedColor,
      toggleEditingColor,
      cancelSelectedColorEdit,
      updateSelectedColorEdit,
      toggleRemoveConfirm
    } = this.props;

    if (editing && !editingColor) {
      let result;

      if (editingSelectedColor) {
        result = (
          <div>
            <div className={cx(styles.button, styles.changeButton)} onClick={cancelSelectedColorEdit}>
              Cancel
            </div>
            <div className={cx(styles.button, styles.saveButton)} onClick={updateSelectedColorEdit}>
              Save Changes
            </div>
          </div>
        );
      } else {
        result = (
          <div>
            <div
              className={cx(styles.button, styles.changeButton, editingSelected.length !== 1 && styles.disabled)}
              onClick={toggleEditingColor}
            >
              Change Name
            </div>
            <div
              className={cx(styles.button, styles.deleteButton, editingSelected.length === 0 && styles.disabled)}
              onClick={toggleRemoveConfirm}
            >
              Delete
            </div>
            {this.renderRemoveConfirm()}
          </div>
        );
      }

      return result;
    }
  }

  renderRemoveConfirm () {
    const {removeConfirm, removeSelectedColors, toggleRemoveConfirm} = this.props;

    if (removeConfirm) {
      return (
        <ModalDelete
          cancelLabel='Cancel'
          deleteLabel='Delete'
          title='Are you sure?'
          subTitle='You are about to delete the selected colors.
           Removing a color will fallback to #000000 everywhere it is used.
           Do this with caution and consider changing the name and/or value instead.'
          cancel={toggleRemoveConfirm}
          submit={removeSelectedColors}
        />
      );
    }
  }
}
