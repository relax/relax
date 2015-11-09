import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Item from './item';

export default class MediaGrid extends Component {
  static propTypes = {
    media: PropTypes.array.isRequired,
    selected: PropTypes.array,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    selected: []
  }

  render () {
    return (
      <div className='media-grid'>
        {this.props.media.map(this.renderItem, this)}
      </div>
    );
  }

  renderItem (data) {
    const selected = this.props.selected.indexOf(data._id) !== -1;

    return (
      <Item
        key={data._id}
        data={data}
        onSelect={this.props.onSelect}
        selected={selected}
      />
    );
  }
}
