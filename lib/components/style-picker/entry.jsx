import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import OptionsMenu from '../options-menu';

export default class Entry extends Component {
  static propTypes = {
    entry: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
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
    // if (this.props.styleOptions.getIdentifierLabel) {
    //   return (
    //     <span className='info'>{this.props.styleOptions.getIdentifierLabel(this.props.entry.options)}</span>
    //   );
    // }
  }
}
