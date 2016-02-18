import * as dndActions from 'actions/dnd';

import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dragger from './dragger';

@connect(
  (state) => ({
    draggingData: state.dnd.draggingData
  }),
  (dispatch) => ({
    dndActions: bindActionCreators(dndActions, dispatch)
  })
)
export default class DraggerContainer extends Component {
  render () {
    return <Dragger {...this.props}/>;
  }
}
