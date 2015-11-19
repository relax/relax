import React from 'react';
import {Component} from 'relax-framework';

import OptionsMenu from '../options-menu';

export default class Entry extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    styleOptions: React.PropTypes.object.isRequired,
    removeStyle: React.PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      options: false
    };
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
    this.props.onClick(this.props.entry._id);
  }

  duplicate () {

  }

  remove () {
    this.props.removeStyle(this.props.entry._id);
  }

  render () {
    return (
      <div className='entry' onClick={::this.onClick} onMouseLeave={::this.onMouseLeave}>
        <div className='info-holder'>
          <span className='title'>{this.props.entry.title}</span>
          {this.renderOptionsButton()}
          {this.renderInfo()}
        </div>
      </div>
    );
  }

  renderOptionsButton () {
    if (this.props.entry._id !== 'no_style') {
      return (
        <span className='options-btn' onClick={::this.openOptions}>
          <i className='material-icons'>more_horiz</i>
          {this.renderOptionsMenu()}
        </span>
      );
    }
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Duplicate', action: ::this.duplicate, icon: 'fa fa-copy'},
          {label: 'Remove', action: ::this.remove, icon: 'fa fa-trash-o'}
        ]} />
      );
    }
  }

  renderInfo () {
    if (this.props.styleOptions.getIdentifierLabel && this.props.entry._id !== 'no_style') {
      return (
        <span className='info'>{this.props.styleOptions.getIdentifierLabel(Object.assign({}, this.props.styleOptions.defaults, this.props.entry.options))}</span>
      );
    }
  }
}
