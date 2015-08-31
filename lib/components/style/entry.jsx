import {Component} from 'relax-framework';
import React from 'react';
import OptionsMenu from '../options-menu';
import cloneDeep from 'lodash.clonedeep';

import stylesActions from '../../client/actions/style';

export default class StyleEntry extends Component {
  getInitialState () {
    return {
      options: false
    };
  }

  onMouseEnter () {
    this.props.onMouseEnter(this.props.style);
  }

  onMouseLeave () {
    if (!this.props.selected) {
      this.props.onMouseLeave();
    }
    if (this.state.options) {
      this.setState({
        options: false
      });
    }
  }

  onClick (event) {
    event.preventDefault();
    this.props.onSelect(this.props.style);
  }

  duplicate (event) {
    event.preventDefault();
    var style = cloneDeep(this.props.style);
    delete style._id;
    stylesActions.add(style);
  }

  remove (event) {
    event.preventDefault();
    stylesActions.remove(this.props.style._id);
  }

  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  editClick (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onEdit(this.props.style);
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Duplicate', action: this.duplicate.bind(this), icon: 'fa fa-copy'},
          {label: 'Remove', action: this.remove.bind(this), icon: 'fa fa-trash-o'}
        ]} />
      );
    }
  }

  render (style) {
    var props = {
      className: 'style-entry',
      href: '#',
      onMouseLeave: this.onMouseLeave.bind(this)
    };

    if (this.props.selected) {
      props.className += ' selected';
    } else {
      props.onMouseEnter = this.onMouseEnter.bind(this);
      props.onClick = this.onClick.bind(this);
    }

    return (
      <a {...props}>
        <span>{this.props.style.title}</span>
        <div className='style-btn' onClick={this.editClick.bind(this)}>
          <i className='fa fa-pencil'></i>
        </div>
        <div className='style-btn options' onClick={this.openOptions.bind(this)}>
          <i className='fa fa-ellipsis-h'></i>
          {this.renderOptionsMenu()}
        </div>
      </a>
    );
  }
}

StyleEntry.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  style: React.PropTypes.object.isRequired,
  onMouseEnter: React.PropTypes.func.isRequired,
  onMouseLeave: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};
