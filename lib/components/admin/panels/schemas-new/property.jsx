import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

export default class Prop extends Component {
  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.property.id);
  }

  renderRemove () {
    if (!this.props.property.locked) {
      return (
        <div className='remove-prop' onClick={this.onRemove.bind(this)}>
          <i className='material-icons'>delete</i>
        </div>
      );
    }
  }

  render () {
    return (
      <div className={cx('prop-entry', this.props.selected && 'active', this.props.property.locked && 'locked')} onClick={this.props.onClick}>
        <div className='prop-info'>
          <div className='prop-title'>{this.props.property.title}</div>
          <div className='prop-type'>{this.props.property.type}</div>
        </div>
        {this.renderRemove()}
      </div>
    );
  }
}

Prop.propTypes = {
  property: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
};
