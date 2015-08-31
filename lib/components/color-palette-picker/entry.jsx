import {Component} from 'relax-framework';
import React from 'react';
import OptionsMenu from '../options-menu';
import cloneDeep from 'lodash.clonedeep';
import cx from 'classnames';

import colorsActions from '../../client/actions/colors';

export default class Entry extends Component {
  getInitialState () {
    return {
      options: false
    };
  }

  edit () {
    this.props.onEdit(this.props.color);
    this.setState({
      options: false
    });
  }

  duplicate () {
    var duplicate = cloneDeep(this.props.color);
    delete duplicate._id;

    colorsActions.add(duplicate);

    this.setState({
      options: false
    });
  }

  remove () {
    colorsActions.remove(this.props.color._id);
  }

  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  onMouseLeave () {
    if (this.state.options) {
      this.setState({
        options: false
      });
    }
  }

  onClick (event) {
    event.preventDefault();
    this.props.onClick(this.props.color._id);
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Edit', action: this.edit.bind(this), icon: 'fa fa-pencil'},
          {label: 'Duplicate', action: this.duplicate.bind(this), icon: 'fa fa-copy'},
          {label: 'Remove', action: this.remove.bind(this), icon: 'fa fa-trash-o'}
        ]} />
      );
    }
  }

  render () {
    var style = {
      backgroundColor: this.props.color.value
    };

    return (
      <div className={cx('color-entry', this.props.selected && 'selected')} onMouseLeave={this.onMouseLeave.bind(this)} onClick={this.onClick.bind(this)}>
        <div className='color' style={style}></div>
        <span>{this.props.color.label}</span>
        <div className='options-btn' onClick={this.openOptions.bind(this)}>
          <i className='material-icons'>more_horiz</i>
          {this.renderOptionsMenu()}
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  color: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
};
