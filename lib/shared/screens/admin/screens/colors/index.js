import * as colorsActions from 'actions/colors';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Colors from './components/colors.jsx';

@dataConnect(
  (state) => ({
    opened: state.color.opened
  }),
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
    removeColor: PropTypes.func.isRequired,
    openNewColor: PropTypes.func.isRequired,
    closeNewColor: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    colors: []
  };

  getInitState () {
    return {
      search: ''
    };
  }

  @bind
  searchChange (search) {
    this.setState({
      search
    });
  }

  render () {
    const {
      colors,
      duplicateColor,
      removeColor,
      openNewColor,
      closeNewColor,
      opened
    } = this.props;
    return (
      <Colors
        colors={colors}
        searchChange={this.searchChange}
        duplicateColor={duplicateColor}
        removeColor={removeColor}
        openNewColor={openNewColor}
        closeNewColor={closeNewColor}
        opened={opened}
        {...this.state}
      />
    );
  }
}
