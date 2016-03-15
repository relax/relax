import * as colorsActions from 'actions/colors';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Colors from './components/colors.jsx';

@dataConnect(
  null,
  (dispatch) => bindActionCreators(colorsActions, dispatch),
  () => ({
    fragments: Colors.fragments,
    mutations: {
      duplicateColor: [{
        type: 'APPEND',
        field: 'colors'
      }],
      addColor: [{
        type: 'APPEND',
        field: 'colors'
      }]
    }
  })
)
export default class ColorsContainer extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    duplicateColor: PropTypes.func.isRequired,
    removeColor: PropTypes.func.isRequired
  };

  static defaultProps = {
    colors: []
  };

  getInitState () {
    return {
      search: ''
    };
  }

  searchChange (search) {
    this.setState({
      search
    });
  }

  render () {
    const {colors, duplicateColor, removeColor} = this.props;
    return (
      <Colors
        colors={colors}
        searchChange={::this.searchChange}
        duplicateColor={duplicateColor}
        removeColor={removeColor}
        {...this.state}
      />
    );
  }
}
