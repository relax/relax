import * as mediaActions from 'actions/media';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import MediaSelector from './media-selector';

@dataConnect(
  (state) => ({
    uploadsVisible: state.media.uploads.length > 0
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  () => ({
    fragments: MediaSelector.fragments,
    variablesTypes: {
      media: {
        sort: 'String',
        order: 'String'
      }
    },
    initialVariables: {
      media: {
        sort: '_id',
        order: 'desc'
      }
    },
    mutations: {
      addMedia: [
        {
          type: 'PREPEND',
          field: 'media'
        }
      ]
    }
  })
)
export default class MediaSelectorContainer extends Component {
  static propTypes = {
    selected: PropTypes.string,
    media: PropTypes.array
  };

  static defaultProps = {
    media: []
  };

  render () {
    return (
      <MediaSelector
        {...this.props}
      />
    );
  }
}
