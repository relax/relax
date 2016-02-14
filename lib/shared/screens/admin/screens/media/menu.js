import * as adminMenuActions from 'actions/admin-menu';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@dataConnect()
@connect(
  (state) => ({}),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch)
)
export default class MediaMenuContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.openAdminMenu();
  }

  initialize () {
    this.props.fetchData({
      fragments: Menu.fragments
    });
  }

  onBack () {
    this.props.closeAdminMenu();
  }

  onNew () {

  }

  render () {
    return (
      <Menu
        onBack={::this.onBack}
        onNew={::this.onNew}
      />
    );
  }
}
