import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Fonts from './components/fonts.jsx';

@dataConnect()
@connect(
  (state) => ({
    fonts: state.fonts.data
  })
)
export default class FontsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    fonts: PropTypes.object.isRequired
  };

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

  render () {
    return (
      <Fonts
        {...this.props}
      />
    );
  }
}
