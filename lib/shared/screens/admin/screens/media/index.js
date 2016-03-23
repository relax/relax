import * as mediaActions from 'actions/media';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Media from './components/media.jsx';

@dataConnect(
  null,
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  () => ({
    fragments: Media.fragments
  })
)
export default class MediaContainer extends Component {
  static propTypes = {
    media: PropTypes.array.isRequired
  };

  static defaultProps = {
    media: []
  };

  render () {
    return (
      <Media
        {...this.props}
      />
    );
  }
}
