import cx from 'classnames';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../animate';
import Edit from './edit';
import Entry from './entry';
import Input from '../data-types/input';

export default class StylePicker extends Component {
  static fragments = {
    style: {
      _id: 1,
      type: 1,
      title: 1,
      options: 1,
      displayOptions: 1
    }
  }

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
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.saveStyle();
  }

  render () {
    return (
      <div className='style-picker'>
        <div className='selected-style' onClick={this.props.toggleEditing}>
          <span>{this.props.selectedStyle.title}</span>
          <i className='material-icons'>{this.props.editing ? 'expand_less' : 'expand_more'}</i>
        </div>
        <div className={cx('content-scrollable', this.props.selectedStyle._id === 'no_style' && this.props.editing && 'no_style')}>
          <GeminiScrollbar autoshow>
            {this.renderContent()}
          </GeminiScrollbar>
        </div>
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
    if (this.props.editing && this.props.selectedStyle._id === 'no_style') {
      let result;
      if (this.props.editingTitle) {
        result = (
          <div className='save-style'>
            <Animate transition='slideRightIn' duration={300}>
              <form onSubmit={::this.onSubmit}>
                <Input placeholder='Style title' value={this.props.titleValue} onChange={this.props.changeTitleValue} focused />
                <div className='submit-button' onClick={this.props.saveStyle}>
                  <i className='material-icons'>arrow_forward</i>
                </div>
                <input type='submit' hidden />
              </form>
            </Animate>
          </div>
        );
      } else {
        result = (
          <div className='save-style'>
            <div className='button button-primary' onClick={this.props.toggleEditingTitle}>
              Save style
            </div>
          </div>
        );
      }
      return result;
    }
  }
}
