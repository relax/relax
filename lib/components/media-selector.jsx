import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import MediaItem from './media-item';
import Upload from './upload';

export default class MediaSelector extends Component {
  static propTypes = {
    selected: PropTypes.string,
    onAddMedia: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    selected: ''
  }

  getInitialState () {
    return {
      selected: this.props.selected,
      media: []
    };
  }

  imageClicked (id, event) {
    event.preventDefault();

    this.setState({
      selected: id
    });

    if (this.props.onChange) {
      this.props.onChange(id);
    }
  }

  render () {
    // TODO `acceptedFiles` on `Upload` does not seem to be being used inside
    // the `Upload` component
    return (
      <div className='media-selector'>
        <Upload acceptedFiles='image/*' onFile={this.props.onAddMedia}>
          {this.state.media.map(this.renderMediaItem, this)}
        </Upload>
      </div>
    );
  }

  renderMediaItem (item) {
    var className = 'ms-item';

    if (item._id === this.state.selected) {
      className += ' selected';
    }

    return (
      <a href='#' className={className} key={item._id} onClick={this.imageClicked.bind(this, item._id)}>
        <MediaItem item={item} width='100' height='100' />
      </a>
    );
  }
}
