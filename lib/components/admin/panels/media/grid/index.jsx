import {Component} from 'relax-framework';
import React from 'react';
import Item from './item';

export default class MediaGrid extends Component {
  renderItem (data) {
    var selected = this.props.selected.indexOf(data._id) !== -1;
    return (
      <Item key={data._id} data={data} onSelect={this.props.onSelect} selected={selected} />
    );
  }

  render () {
    return (
      <div className='media-grid'>
        {this.props.media.map(this.renderItem, this)}
      </div>
    );
  }
}

MediaGrid.propTypes = {
  media: React.PropTypes.array.isRequired,
  selected: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
};
