import * as mediaActions from 'actions/media';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Media from './components/media.jsx';

@dataConnect(
  (state) => ({
    uploadsVisible: state.media.uploads.length > 0,
    sort: state.router.location.query.sort || '_id',
    order: state.router.location.query.order || 'desc',
    search: state.router.location.query.s || ''
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  (props) => ({
    fragments: Media.fragments,
    variablesTypes: {
      media: {
        sort: 'String',
        order: 'String',
        search: 'String',
        s: 'String'
      }
    },
    initialVariables: {
      media: {
        sort: props.sort,
        order: props.order,
        search: 'title',
        s: props.search
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
export default class MediaContainer extends Component {
  static propTypes = {
    media: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
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
