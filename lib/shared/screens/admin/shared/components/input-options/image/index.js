import * as mediaActions from 'actions/media';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import ImagePicker from './picker';

@dataConnect(
  null,
  (dispatch) => bindActionCreators(mediaActions, dispatch),
  (props) => {
    const result = {
      fragments: {},
      variablesTypes: {
        mediaItem: {
          id: 'ID!'
        }
      },
      initialVariables: {
        mediaItem: {
          id: props.value
        }
      }
    };

    if (props.value) {
      result.fragments = ImagePicker.fragments;
    }

    return result;
  }
)
export default class ImagePickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    allowedType: PropTypes.string
  };

  static defaultProps = {
    allowedType: 'image'
  };

  getInitState () {
    return {
      mounted: false,
      calcWidth: 200,
      selector: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value && nextProps.value) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  openSelector () {
    this.setState({
      selector: true
    });
  }

  @bind
  closeSelector () {
    this.setState({
      selector: false
    });
  }

  @bind
  onMount (width) {
    this.setState({
      mounted: true,
      calcWidth: width
    });
  }

  render () {
    const {mediaItem, allowedType} = this.props;

    return (
      <ImagePicker
        {...this.props}
        {...this.state}
        openSelector={this.openSelector}
        closeSelector={this.closeSelector}
        onMount={this.onMount}
        mediaItem={mediaItem}
        allowedType={allowedType}
      />
    );
  }
}
