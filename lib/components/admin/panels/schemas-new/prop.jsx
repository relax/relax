import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';

export default class Prop extends Component {
  onRemove (event) {
    event.preventDefault();
    this.props.onRemove(this.props.prop.id);
  }

  renderRemove () {
    if (!this.props.prop.locked) {
      return (
        <div className='remove-prop' onClick={this.onRemove.bind(this)}>
          <i className='material-icons'>delete</i>
        </div>
      );
    }
  }

  render () {
    return (
      <div className={cx('prop-entry', this.props.selected && 'active')}>
        <div className='prop-info'>
          <div className='prop-title'>{this.props.prop.id}</div>
          <div className='prop-type'>{this.props.prop.type}</div>
        </div>
        {this.renderRemove()}
      </div>
    );
  }
}

Prop.propTypes = {
  prop: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired
};
