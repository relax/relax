import * as adminMenuActions from 'actions/admin-menu';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@connect(
  (state) => ({
    location: state.router.location
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch)
)
export default class SettingsMenuContainer extends Component {
  static propTypes = {
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.openAdminMenu();
  }

  @bind
  onBack () {
    this.props.closeAdminMenu();
  }

  render () {
    return (
      <Menu
        onBack={this.onBack}
      />
    );
  }
}
