import {Component} from 'relax-framework';
import React from 'react';
import Utils from '../../../../../utils';

import mediaActions from '../../../../../client/actions/media';

export default class MediaGridItem extends Component {
  getInitialState () {
    return {
      requested: false
    };
  }

  onSelect (id, event) {
    event.preventDefault();
    this.props.onSelect(id);
  }

  render () {
    var className = '';
    if (this.props.selected) {
      className += 'active';
    }

    const width = 350;
    const height = 190;

    const variation = Utils.getBestImageVariation(this.props.data.variations, width, height);

    var style = {};

    if (variation !== false) {
      style.backgroundImage = 'url('+variation.url+')';
    } else {
      style.backgroundColor = '#cccccc';

      if (!this.state.requested) {
        this.state.requested = true;
        mediaActions.resize({
          id: this.props.data._id,
          width,
          height
        });
      }
    }

    return (
      <a href='#' onClick={this.onSelect.bind(this, this.props.data._id)} style={style} className={className}></a>
    );
  }
}

MediaGridItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired
};
