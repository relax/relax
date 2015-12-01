import {Component} from 'relax-framework';
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import Lightbox from '../../../lightbox';

export default class Color extends Component {
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
    removeColor: React.PropTypes.func.isRequired,
    addColor: React.PropTypes.func.isRequired
  }

  getInitState () {
    return {
      removing: false
    };
  }

  onEdit (event) {
    event.preventDefault();
    this.props.onEdit(cloneDeep(this.props.color));
  }

  onRemove (event) {
    event.preventDefault();
    this.setState({
      removing: true
    });
  }

  cancelRemove (event) {
    event.preventDefault();
    this.setState({
      removing: false
    });
  }

  confirmRemove (event) {
    event.preventDefault();
    this.props.removeColor(this.constructor.fragments, this.props.color).done();
    this.setState({
      removing: false
    });
  }

  onDuplicate (event) {
    event.preventDefault();
    var cloneColor = cloneDeep(this.props.color);
    delete cloneColor._id;
    this.props.addColor(this.constructor.fragments, cloneColor).done();
  }

  render () {
    var colorStyle = {
      backgroundColor: this.props.color.value
    };

    return (
      <div className='color'>
        <div className='color-preview' style={colorStyle}></div>
        <div className='color-info'>
          <div className='color-label'>{this.props.color.label}</div>
          <div className='color-value'>{this.props.color.value}</div>
          <div className='actions'>
            <a href='#' onClick={this.onEdit.bind(this)}>
              <i className='material-icons'>mode_edit</i>
              <span>Edit</span>
            </a>
            <a href='#' onClick={this.onDuplicate.bind(this)}>
              <i className='material-icons'>content_copy</i>
              <span>Duplicate</span>
            </a>
            <a href='#' onClick={this.onRemove.bind(this)}>
              <i className='material-icons'>remove_circle_outline</i>
              <span>Remove</span>
            </a>
          </div>
        </div>
        {this.renderRemoving()}
      </div>
    );
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the color ' + this.props.color.label + ' from your colors palette?';
      const label1 = 'Every component in your pages using this color will loose the link to it! Notice you can change its value and label to customize and not lose the link.';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='medium centered'>{label1}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete it!</a>
          </div>
        </Lightbox>
      );
    }
  }
}
