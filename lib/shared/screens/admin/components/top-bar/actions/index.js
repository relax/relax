import * as displayActions from 'actions/display';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleEditing} from 'actions/page-builder';

import Actions from './actions';

// import * as pageActions from 'actions/page';

@connect(
  (state) => ({
    display: state.display,
    location: state.router.location,
    building: !!state.router.location.query.build
  }),
  (dispatch) => bindActionCreators({
    ...displayActions,
    toggleEditing
  }, dispatch)
)
export default class ActionsContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
    changeDisplay: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired
  };

  render () {
    return (
      <Actions
        {...this.props}
      />
    );
  }
}
