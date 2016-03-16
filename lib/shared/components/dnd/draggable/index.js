import * as dndActions from 'actions/dnd';

import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Draggable from './draggable';

@connect(
  () => ({}),
  (dispatch) => ({
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class DraggableContainer extends Component {
  render () {
    return <Draggable {...this.props} />;
  }
}
