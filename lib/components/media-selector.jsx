import {Component} from 'relax-framework';
import React from 'react';
// import mediaStore from '../client/stores/media';
// import mediaActions from '../client/actions/media';
import Upload from './upload';
import MediaItem from './media-item';

export default class MediaSelector extends Component {
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

  onSuccess (file, mediaItem, progressFinal) {
    // mediaActions.add(mediaItem);
    file.previewElement.style.display = "none";
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

  render () {
    return (
      <div className='media-selector'>
        <Upload action='/api/media/upload' acceptedFiles='image/*' success={this.onSuccess.bind(this)}>
          {this.state.media.map(this.renderMediaItem, this)}
        </Upload>
      </div>
    );
  }
}

MediaSelector.propTypes = {
  onChange: React.PropTypes.func,
  selected: React.PropTypes.string
};

MediaSelector.defaultProps = {
  selected: ''
};
