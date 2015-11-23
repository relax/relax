import * as overlayActions from '../../client/actions/overlays';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import IconPicker from '../../components/data-types/icon-picker';
import IconSelector from './icon-selector';
import Modal from '../../components/modal';

@connect(
  (state) => ({}),
  (dispatch) => bindActionCreators(overlayActions, dispatch)
)
export default class IconPickerContainer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    addOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  openSelector () {
    this.props.addOverlay('icon-selector', (
      <Modal onClose={::this.closeSelector}>
        <IconSelector onChange={this.props.onChange} value={this.props.value} onClose={::this.closeSelector} />
      </Modal>
    ));
  }

  closeSelector () {
    this.props.closeOverlay('icon-selector');
  }

  render () {
    return (
      <IconPicker
        {...this.props}
        {...this.state}
        openSelector={::this.openSelector}
      />
    );
  }
}
