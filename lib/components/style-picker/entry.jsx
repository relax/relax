import React from 'react';
import {Component} from 'relax-framework';

export default class Entry extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    styleOptions: React.PropTypes.object.isRequired
  }

  onClick (event) {
    event.preventDefault();
    this.props.onClick(this.props.entry._id);
  }

  render () {
    return (
      <div className='entry' onClick={this.onClick.bind(this)}>
        <div className='info-holder'>
          <span className='title'>{this.props.entry.title}</span>
          {this.renderInfo()}
        </div>
      </div>
    );
  }

  renderInfo () {
    if (this.props.styleOptions.getIdentifierLabel && this.props.entry._id !== 'no_style') {
      return (
        <span className='info'>{this.props.styleOptions.getIdentifierLabel(this.props.entry.options)}</span>
      );
    }
  }
}
