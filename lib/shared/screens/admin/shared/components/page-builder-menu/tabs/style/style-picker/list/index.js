import * as pageBuilderActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removeStyle} from 'actions/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import List from './list';

@connect(
  (state) => ({
    styles: state.styles,
    selected: state.pageBuilder.selected
  }),
  (dispatch) => bindActionCreators({...pageBuilderActions, removeStyle}, dispatch)
)
export default class StylePickerListContainer extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    changeElementStyle: PropTypes.func.isRequired,
    removeStyle: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
    selectedStyle: PropTypes.object
  };

  @bind
  changeStyle (styleId) {
    const {changeElementStyle, selected} = this.props;
    changeElementStyle(selected.id, styleId, selected.context);
  }

  render () {
    const {styles, selectedStyle} = this.props;

    return (
      <List
        styles={styles}
        removeStyle={this.props.removeStyle}
        changeStyle={this.changeStyle}
        currentId={selectedStyle && selectedStyle._id}
      />
    );
  }
}
