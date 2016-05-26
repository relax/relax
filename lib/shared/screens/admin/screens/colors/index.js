import * as colorsActions from 'actions/colors';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Colors from './components/colors.jsx';

@dataConnect(
  (state) => ({
    opened: state.color.opened,
    editing: state.color.editing,
    removeOpened: state.color.removeOpened,
    removeId: state.color.removeId
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
    openRemoveColor: PropTypes.func.isRequired,
    closeRemoveColor: PropTypes.func.isRequired,
    openNewColor: PropTypes.func.isRequired,
    closeNewColor: PropTypes.func.isRequired,
    openEditColor: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    removeOpened: PropTypes.bool.isRequired,
    removeId: PropTypes.string,
    editing: PropTypes.bool.isRequired
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
      editing,
      duplicateColor,
      removeColor,
      openNewColor,
      closeNewColor,
      openEditColor,
      opened,
      openRemoveColor,
      closeRemoveColor,
      removeOpened,
      removeId
    } = this.props;
    return (
      <Colors
        colors={colors}
        editing={editing}
        searchChange={this.searchChange}
        duplicateColor={duplicateColor}
        removeColor={removeColor}
        openRemoveColor={openRemoveColor}
        closeRemoveColor={closeRemoveColor}
        openNewColor={openNewColor}
        closeNewColor={closeNewColor}
        openEditColor={openEditColor}
        opened={opened}
        removeOpened={removeOpened}
        removeId={removeId}
        {...this.state}
      />
    );
  }
}
