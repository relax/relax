import bind from 'decorators/bind';
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

  getInitState () {
    return {
      opened: true
    };
  }

  @bind
  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {uploads} = this.props;
    const {opened} = this.state;
    return (
      <Uploading
        uploads={uploads}
        opened={opened}
        toggleOpened={this.toggleOpened}
      />
    );
  }
}
