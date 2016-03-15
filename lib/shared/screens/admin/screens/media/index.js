import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Media from './components/media.jsx';

@dataConnect(
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
