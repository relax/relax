import cx from 'classnames';
import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Input from 'components/input-options/input';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import classes from './style-picker.less';
import Edit from './edit';
import Entry from './entry';

export default class StylePicker extends Component {
  static fragments = {
    style: {
      _id: 1,
      type: 1,
      title: 1,
      options: 1,
      displayOptions: 1
    }
  };

  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    styles: PropTypes.array.isRequired,
    selectedStyle: PropTypes.object.isRequired,
    editing: PropTypes.bool.isRequired,
    editingTitle: PropTypes.bool.isRequired,
    titleValue: PropTypes.string.isRequired,
    changeTitleValue: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    toggleEditingTitle: PropTypes.func.isRequired,
    saveStyle: PropTypes.func.isRequired,
    styleOptions: PropTypes.object.isRequired,
    removeStyle: PropTypes.func.isRequired,
    duplicateStyle: PropTypes.func.isRequired,
    display: React.PropTypes.string.isRequired
  };

  onSubmit (event) {
    event.preventDefault();
    this.props.saveStyle();
  }

  render () {
    const {selectedStyle, toggleEditing, editing} = this.props;
    return (
      <div>
        <div className={classes.selected} onClick={toggleEditing}>
          <span>{selectedStyle.title}</span>
          <i className={cx('nc-icon-outline', editing ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')}></i>
        </div>
        <Scrollable
          className={cx(classes.content, selectedStyle._id === 'no_style' && editing && classes.noStyle)}
        >
          {this.renderContent()}
        </Scrollable>
        {this.renderSaveStyle()}
      </div>
    );
  }

  renderContent () {
    let result;
    if (this.props.editing) {
      result = (
        <Animate transition='slideDownIn' duration={300} key='edit'>
          {this.renderEdit()}
        </Animate>
      );
    } else if (this.props.styles.length > 1) {
      result = (
        <Animate transition='slideUpIn' duration={300} key='list'>
          <div>
            {this.props.styles.map(this.renderEntry, this)}
          </div>
        </Animate>
      );
    }
    return result;
  }

  renderEntry (entry) {
    if (entry._id !== this.props.selectedStyle._id) {
      return (
        <Entry
          entry={entry}
          key={entry._id}
          styleOptions={this.props.styleOptions}
          onClick={this.props.onChange}
          removeStyle={this.props.removeStyle}
          duplicateStyle={this.props.duplicateStyle}
        />
      );
    }
  }

  renderEdit () {
    return (
      <Edit
        display={this.props.display}
        selectedStyle={this.props.selectedStyle}
        styleOptions={this.props.styleOptions}
        onChange={this.props.onChangeValue}
      />
    );
  }

  renderSaveStyle () {
    const {
      editing,
      selectedStyle,
      editingTitle,
      titleValue,
      changeTitleValue,
      saveStyle,
      toggleEditingTitle
    } = this.props;
    if (editing && selectedStyle._id === 'no_style') {
      let result;
      if (editingTitle) {
        result = (
          <div className={classes.saveStyle}>
            <Animate transition='slideRightIn' duration={300}>
              <form onSubmit={::this.onSubmit}>
                <Input
                  className={classes.input}
                  placeholder='Style title'
                  value={titleValue}
                  onChange={changeTitleValue}
                  focused
                />
                <div className={classes.submitButton} onClick={saveStyle}>
                  <i className='nc-icon-outline arrows-1_tail-right'></i>
                </div>
                <input type='submit' hidden />
              </form>
            </Animate>
          </div>
        );
      } else {
        result = (
          <div className={classes.saveStyle}>
            <Button primary full big onClick={toggleEditingTitle}>
              Save style
            </Button>
          </div>
        );
      }
      return result;
    }
  }
}
