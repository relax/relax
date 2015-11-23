import * as adminActions from '../../client/actions/admin';
import * as mediaActions from '../../client/actions/media';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import MediaSelector from '../../components/data-types/media-selector';
import {getQueryVariables} from '../../decorators/query-props';

@connect(
  (state) => ({
    media: state.media.data.items,
    mediaSingles: state.media.singles,
    errors: state.menu.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(mediaActions, dispatch),
    ...bindActionCreators(adminActions, dispatch)
  })
)
export default class MediaSelectorContainer extends Component {
  static fragments = MediaSelector.fragments

  static propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    media: PropTypes.array.isRequired,
    mediaSingles: PropTypes.array.isRequired,
    getAdmin: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    getMediaItem: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      selected: this.props.selected,
      view: 'small',
      search: '',
      sort: {
        property: '_id',
        order: 'desc'
      }
    };
  }

  componentDidMount () {
    const vars = {
      media: {
        ...getQueryVariables({
          sort: this.state.sort.property,
          order: this.state.sort.order
        })
      }
    };
    const fragments = {
      media: this.constructor.fragments.media
    };

    if (this.state.selected) {
      vars.mediaItem = {
        id: {
          value: this.state.selected,
          type: 'String!'
        }
      };
      fragments.mediaItem = this.constructor.fragments.mediaItem;
    }

    this.props
      .getAdmin(buildQueryAndVariables(
        fragments,
        vars
      ))
      .done();
  }

  fetchMediaItems () {
    const vars = {
      media: {
        ...getQueryVariables({
          sort: this.state.sort.property,
          order: this.state.sort.order
        })
      }
    };
    const fragments = {
      media: this.constructor.fragments.media
    };

    this.props
      .getAdmin(buildQueryAndVariables(
        fragments,
        vars
      ))
      .done();
  }

  onItemClick (id) {
    this.props.onChange(id);
    this.setState({
      selected: id
    });
    this.props.getMediaItem({media: this.constructor.fragments.mediaItem}, id);
  }

  async onAddMedia (file) {
    await this.props.addMedia(this.constructor.fragments, file);
  }

  changeView (view) {
    this.setState({
      view
    });
  }

  changeSort (key, value) {
    this.setState({
      sort: Object.assign({}, this.state.sort, {
        [key]: value
      })
    }, () => {
      this.fetchMediaItems();
    });
  }

  render () {
    const mediaItem = this.props.mediaSingles[this.state.selected];

    return (
      <MediaSelector
        {...this.state}
        media={this.props.media}
        mediaItem={mediaItem}
        onAddMedia={::this.onAddMedia}
        onItemClick={::this.onItemClick}
        onClose={this.props.onClose}
        changeView={::this.changeView}
        changeSort={::this.changeSort}
      />
    );
  }
}
