import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import MediaItem from '../../../../media-item';

export default class MediaGridItem extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    selected: false,
    width: 350,
    height: 190
  }

  render () {
    return (
      <a
        href='#'
        onClick={this.props.onSelect && this.props.onSelect.bind(null, this.props.data._id)}
        className={cx(this.props.selected && 'active')}
      >
        <MediaItem item={this.props.data} width={this.props.width} height={this.props.height} useThumbnail={false} />
      </a>
    );
  }
}
