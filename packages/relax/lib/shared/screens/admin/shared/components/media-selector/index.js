import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {getMimeTypes} from 'helpers/mime-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import MediaSelector from './media-selector';

@dataConnect(
  (state) => ({
    uploads: state.media.uploads
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  () => ({
    fragments: MediaSelector.fragments,
    variablesTypes: {
      media: {
        sort: 'String',
        order: 'String',
        filters: '[Filter]'
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
    media: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    allowedType: PropTypes.string.isRequired,
    uploadMediaFiles: PropTypes.func.isRequired,
    uploads: PropTypes.array.isRequired
  };

  static defaultProps = {
    media: []
  };

  getInitState () {
    return {
      sort: '_id',
      order: 'desc',
      type: 'all'
    };
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.sort !== nextState.sort ||
        this.state.order !== nextState.order ||
        this.state.type !== nextState.type) {
      const filter = nextState.type;
      let filters = [];
      if (filter !== 'all') {
        let type = getMimeTypes(filter);
        let op = 'in';
        if (!type) {
          op = 'eq';
          type = filter;
        }
        filters = [{
          property: 'type',
          op: {
            [op]: type
          }
        }];
      }

      nextProps.relate.setVariables({
        media: {
          sort: nextState.sort,
          order: nextState.order,
          filters
        }
      });
    }
  }

  @bind
  changeSort (sort) {
    this.setState({sort});
  }

  @bind
  changeOrder (order) {
    this.setState({order});
  }

  @bind
  changeType (type) {
    this.setState({type});
  }

  render () {
    const {media, selected, onClose, onChange, allowedType, uploadMediaFiles, uploads} = this.props;

    return (
      <MediaSelector
        {...this.state}
        allowedType={allowedType}
        media={media}
        selected={selected}
        onClose={onClose}
        onChange={onChange}
        changeSort={this.changeSort}
        changeOrder={this.changeOrder}
        changeType={this.changeType}
        uploadMediaFiles={uploadMediaFiles}
        uploads={uploads}
      />
    );
  }
}
