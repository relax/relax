import Component from 'components/component';
import Input from 'components/input-options/input';
import React, {PropTypes} from 'react';

import styles from './colors-collection.less';
import Color from './color';

export default class ColorsCollection extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    selectColor: PropTypes.func.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    addingColor: PropTypes.bool.isRequired,
    addingColorName: PropTypes.string.isRequired,
    changeAddingColor: PropTypes.func.isRequired,
    toggleAddingColor: PropTypes.func.isRequired,
    addColor: PropTypes.func.isRequired
  };

  onSubmit (event) {
    event.preventDefault();
    this.props.addColor();
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.label}>Color Collection</div>
        <div>
          {this.props.colors.map(this.renderColor, this)}
          <span className={styles.addButton} key='add' onClick={this.props.toggleAddingColor}>
            <i className='nc-icon-mini ui-1_simple-add'></i>
          </span>
        </div>
        {this.renderAdding()}
      </div>
    );
  }

  renderColor (color) {
    return (
      <Color
        color={color}
        key={color._id}
        selectColor={this.props.selectColor}
        addOverlay={this.props.addOverlay}
        closeOverlay={this.props.closeOverlay}
      />
    );
  }

  renderAdding () {
    if (this.props.addingColor) {
      return (
        <form className={styles.adding} onSubmit={::this.onSubmit}>
          <Input
            className={styles.input}
            placeholder='Color name'
            white
            value={this.props.addingColorName}
            onChange={this.props.changeAddingColor}
            focused
          />
          <div className={styles.saveButton} onClick={::this.onSubmit}>Save</div>
        </form>
      );
    }
  }
}
