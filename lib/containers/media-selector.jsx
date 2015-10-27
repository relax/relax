import * as adminActions from '../client/actions/admin';
import * as mediaActions from '../client/actions/media';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import MediaSelector from '../components/media-selector';

@connect(
  (state) => ({
    media: state.media.data.items,
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
    getAdmin: PropTypes.func.isRequired,
    addMedia: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      selected: this.props.selected
    };
  }

  componentDidMount () {
    const vars = {
      media: {}
    };

    this.props
      .getAdmin(buildQueryAndVariables(
        this.constructor.fragments,
        vars
      ))
      .done();
  }

  onItemClick (id) {
    this.props.onChange(id);
    this.setState({
      selected: id
    });
  }

  async onAddMedia (file) {
    await this.props.addMedia(this.constructor.fragments, file);
  }

  render () {
    return (
      <MediaSelector
        selected={this.state.selected}
        media={this.props.media}
        onAddMedia={::this.onAddMedia}
        onItemClick={::this.onItemClick}
      />
    );
  }
}
