import React, {PropTypes} from 'react';
import {Component, mergeFragments} from 'relax-framework';

import Content from './content';
import Filters from './filters';
import SearchBar from './search-bar';
import Selected from './selected';

export default class MediaSelector extends Component {
  static fragments = mergeFragments(Content.fragments, Selected.fragments)

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    mediaItem: PropTypes.object,
    changeView: PropTypes.func.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    mimeTypes: PropTypes.array.isRequired,
    removeMediaItem: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='modal-content media-selector'>
        <div className='modal-menu'>
          <div className='modal-header'>Media selector</div>
          <Filters {...this.props} />
          <Selected mediaItem={this.props.mediaItem} removeMediaItem={this.props.removeMediaItem} />
          <div className='modal-done'>
            <div className='button button-primary' onClick={this.props.onClose}>DONE</div>
          </div>
        </div>
        <div className='modal-content-area'>
          <SearchBar
            view={this.props.view}
            search={this.props.search}
            changeView={this.props.changeView}
            changeSearch={this.props.changeSearch}
            onAddMedia={this.props.onAddMedia}
            mimeTypes={this.props.mimeTypes}
          />
          <Content {...this.props} />
        </div>
      </div>
    );
  }
}
