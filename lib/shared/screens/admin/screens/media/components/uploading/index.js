import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Uploading from './uploading';

@connect(
  (state) => ({
    uploads: state.media.uploads
  })
)
export default class UploadingContainer extends Component {
  static propTypes = {
    uploads: PropTypes.array.isRequired
  };

  render () {
    const {uploads} = this.props;
    return (
      <Uploading uploads={uploads} />
    );
  }
}
