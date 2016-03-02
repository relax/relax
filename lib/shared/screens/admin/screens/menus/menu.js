import * as adminMenuActions from 'actions/admin-menu';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import Menu from './components/menu';

@dataConnect(
  (state) => ({
    activeId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  () => ({
    fragments: Menu.fragments
  })
)
export default class MenusMenuContainer extends Component {
  static propTypes = {
    menus: PropTypes.array.isRequired,
    closeAdminMenu: PropTypes.func.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    activeId: PropTypes.string
  };

  static defaultProps = {
    menus: []
  };

  componentDidMount () {
    this.props.openAdminMenu();
  }

  onBack () {
    this.props.closeAdminMenu();
  }

  onNew () {

  }

  render () {
    const {menus, activeId} = this.props;
    return (
      <Menu
        menus={menus}
        activeId={activeId}
        onBack={::this.onBack}
        onNew={::this.onNew}
      />
    );
  }
}
