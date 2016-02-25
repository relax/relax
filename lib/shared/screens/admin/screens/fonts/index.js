import * as fontsActions from 'actions/fonts';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Fonts from './components/fonts.jsx';

@dataConnect()
@connect(
  (state) => ({
    fonts: state.fonts.data
  }),
  (dispatch) => ({
    fontsActions: bindActionCreators(fontsActions, dispatch)
  })
)
export default class FontsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    fonts: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      previewText: '',
      display: 'grid',
      manage: false
    };
  }

  initialize () {
    this.props.fetchData({
      fragments: {
        settings: {
          _id: 1,
          value: 1
        }
      },
      variables: {
        settings: {
          ids: {
            value: ['fonts'],
            type: '[String]!'
          }
        }
      }
    });
  }

  changeDisplay (display) {
    this.setState({
      display
    });
  }

  changePreviewText (value) {
    this.setState({
      previewText: value
    });
  }

  openManage () {
    this.setState({
      manage: true
    });
  }

  closeManage () {
    this.setState({
      manage: false
    });
  }

  render () {
    return (
      <Fonts
        {...this.props}
        {...this.state}
        changePreviewText={::this.changePreviewText}
        changeDisplay={::this.changeDisplay}
        openManage={::this.openManage}
        closeManage={::this.closeManage}
      />
    );
  }
}
