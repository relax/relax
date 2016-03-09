import * as colorsActions from 'actions/colors';

import {dataConnect} from 'relate-js';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import Colors from './components/colors.jsx';

@dataConnect(
  null,
  (dispatch) => bindActionCreators(colorsActions, dispatch),
  () => ({
    fragments: Colors.fragments,
    mutations: {
      colors: {
        duplicateColor: 'append'
      }
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
