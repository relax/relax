import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import OptionsMenu from '../../options-menu';

export default class Entry extends Component {
  static fragments = {
    color: {
      _id: 1,
      label: 1,
      value: 1
    }
  }

  static propTypes = {
    color: React.PropTypes.object.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    colorsActions: React.PropTypes.object.isRequired
  }

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
    const duplicate = Object.assign({}, this.props.color);
    delete duplicate._id;
    this.props.colorsActions.addColor(this.constructor.fragments, duplicate);

    this.setState({
      options: false
    });
  }

  remove () {
    this.props.colorsActions.removeColor(this.constructor.fragments, this.props.color);
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
}
