import * as mediaActions from '../../client/actions/media';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import MediaManager from '../../components/admin/panels/media';

@connect(
  (state) => ({
    media: state.media.data.items,
    count: state.media.data.count,
    uploadedMedia: state.media.uploadedData,
    errors: state.menu.errors
  }),
  (dispatch) => bindActionCreators(mediaActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10
})
export default class MediaManagerContainer extends Component {
  static fragments = MediaManager.fragments

  static panelSettings = {
    activePanelType: 'media',
    breadcrumbs: [
      {
        label: 'Media'
      }
    ]
  }

  static propTypes = {
    media: PropTypes.array.isRequired,
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired,
    addMedia: PropTypes.func.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      display: 'list',
      upload: false,
      selected: [],
      removing: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        media: {
          ...nextProps.queryVariables
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  async onAddMedia (file) {
    await this.props.addMedia(this.constructor.fragments, file);
  }

  onListClick (event) {
    event.preventDefault();
    this.setState({
      display: 'list'
    });
  }

  onGridClick (event) {
    event.preventDefault();
    this.setState({
      display: 'grid'
    });
  }

  onSelect (id) {
    var index = this.state.selected.indexOf(id);

    if (index === -1) {
      this.state.selected.push(id);
    } else {
      this.state.selected.splice(index, 1);
    }
    this.setState({
      selected: this.state.selected
    });
  }

  onRemoveSelected (event) {
    event.preventDefault();
    this.setState({
      removing: true
    });
  }

  onCancelRemove (event) {
    event.preventDefault();
    this.setState({
      removing: false
    });
  }

  onConfirmRemove (event) {
    event.preventDefault();
    mediaActions.removeBulk(this.state.selected);
    this.setState({
      removing: false,
      selected: []
    });
  }

  onOpenUpload (event) {
    event.preventDefault();
    this.setState({
      upload: true
    });
  }

  onCloseUpload () {
    this.setState({
      upload: false
    });

    const vars = {
      media: {
        ...this.props.queryVariables
      }
    };

    this.props
      .getAdmin(buildQueryAndVariables(
        this.constructor.fragments,
        vars
      ))
      .done();
  }

  render () {
    return (
      <MediaManager
        {...this.props}
        {...this.state}
        onAddMedia={::this.onAddMedia}
        onListClick={::this.onListClick}
        onGridClick={::this.onGridClick}
        onSelect={::this.onSelect}
        onRemoveSelected={::this.onRemoveSelected}
        onCancelRemove={::this.onCancelRemove}
        onConfirmRemove={::this.onConfirmRemove}
        onOpenUpload={::this.onOpenUpload}
        onCloseUpload={::this.onCloseUpload}
      />
    );
  }
}
