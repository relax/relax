import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import MediaItem from '../../../../media-item';

export default class MediaGridItem extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired
  }

  render () {
    const width = 350;
    const height = 190;

    return (
      <a
          href='#'
          onClick={this.props.onSelect.bind(null, this.props.data._id)}
          className={cx(this.props.selected && 'active')}>
        <MediaItem item={this.props.data} width={width} height={height} useThumbnail={false} />
      </a>
    );
  }
}
