import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

export default class Prop extends Component {
  static propTypes = {
    property: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onMoveDown: React.PropTypes.func.isRequired,
    onMoveUp: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,
    first: React.PropTypes.bool.isRequired,
    last: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  onRemove (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.property.id);
  }

  onMoveDown (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onMoveDown(this.props.property.id);
  }

  onMoveUp (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onMoveUp(this.props.property.id);
  }

  render () {
    return (
      <div className={cx('prop-entry', this.props.selected && 'active', this.props.property.locked && 'locked')} onClick={this.props.onClick}>
        <div className='prop-info'>
          <div className='prop-title'>{this.props.property.title}</div>
          <div className='prop-type'>{this.props.property.id + ' - ' + this.props.property.type}</div>
        </div>
        {this.renderActions()}
      </div>
    );
  }

  renderActions () {
    if (!this.props.property.locked) {
      return (
        <div className='actions'>
          {!this.props.last &&
            <div className='down-prop' onClick={this.onMoveDown.bind(this)}>
              <i className='material-icons'>keyboard_arrow_down</i>
            </div>
          }
          {!this.props.first &&
            <div className='up-prop' onClick={this.onMoveUp.bind(this)}>
              <i className='material-icons'>keyboard_arrow_up</i>
            </div>
          }
          <div className='remove-prop' onClick={this.onRemove.bind(this)}>
            <i className='material-icons'>delete</i>
          </div>
        </div>
      );
    }
  }
}
