import {Component} from 'relax-framework';
import React from 'react';
import cx from 'classnames';
import MediaItem from '../../../../media-item';

export default class MediaGridItem extends Component {
  onSelect (id, event) {
    event.preventDefault();
    this.props.onSelect(id);
  }

  render () {
    const width = 350;
    const height = 190;

    return (
      <a href='#' onClick={this.onSelect.bind(this, this.props.data._id)} className={cx(this.props.selected && 'active')}>
        <MediaItem item={this.props.data} width={width} height={height} useThumbnail={false} />
      </a>
    );
  }
}

MediaGridItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired
};
