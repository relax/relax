import * as adminMenuActions from 'actions/admin-menu';
import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@connect(
  (state) => ({
    location: state.router.location
  }),
  (dispatch) => ({
    ...bindActionCreators(adminMenuActions, dispatch),
    ...bindActionCreators(mediaActions, dispatch)
  })
)
export default class MediaMenuContainer extends Component {
  static propTypes = {
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    uploadMediaFiles: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidMount () {
    this.props.openAdminMenu();
  }

  @bind
  onBack () {
    this.props.closeAdminMenu();
  }

  render () {
    const {uploadMediaFiles, location} = this.props;
    return (
      <Menu
        uploadMediaFiles={uploadMediaFiles}
        onBack={this.onBack}
        location={location}
      />
    );
  }
}
