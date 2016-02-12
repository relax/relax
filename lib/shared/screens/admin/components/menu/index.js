import * as adminMenuActions from 'actions/admin-menu';

import dataConnect from 'decorators/data-connector';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './menu';

@dataConnect()
@connect(
  (state) => ({
    schemas: state.schemas.data.items,
    adminMenuOpened: state.adminMenu
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch)
)
export default class MenuContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    adminMenuOpened: PropTypes.bool.isRequired,
    openAdminMenu: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    children: PropTypes.node
  };

  static menuData = [
    {
      label: 'General Settings',
      icon: 'nc-icon-outline ui-1_preferences-container',
      link: '/admin'
    },
    'sep',
    {
      name: 'adminPages',
      label: 'Pages',
      icon: 'nc-icon-outline design_window-paragraph',
      link: '/admin/pages'
    },
    {
      label: 'Templates',
      icon: 'nc-icon-outline ui-2_webpage',
      link: '/admin/templates'
    },
    'sep',
    {
      label: 'Media',
      icon: 'nc-icon-outline media-1_album',
      link: '/admin/media'
    },
    {
      label: 'Menus',
      icon: 'nc-icon-outline design_bullet-list-67',
      link: '/admin/menus'
    },
    {
      label: 'Fonts',
      icon: 'nc-icon-outline design_text',
      link: '/admin/fonts'
    },
    {
      name: 'adminColors',
      label: 'Colors',
      icon: 'nc-icon-outline design_palette',
      link: '/admin/colors'
    },
    {
      name: 'adminUsers',
      label: 'Users',
      icon: 'nc-icon-outline users_multiple-19',
      link: '/admin/users'
    }
  ];

  initialize () {
    this.props.fetchData({
      fragments: Menu.fragments
    });
  }

  onActiveClick () {
    this.props.openAdminMenu();
  }

  render () {
    let active = false;
    if (this.props.routes.length >= 2) {
      forEach(MenuContainer.menuData, (entry) => {
        if (entry !== 'sep' && entry.name === this.props.routes[1].name) {
          active = entry.label;
        }
      });
    }

    const opened = this.props.adminMenuOpened && active && this.props.children;

    return (
      <Menu
        menuData={MenuContainer.menuData}
        active={active}
        onActiveClick={::this.onActiveClick}
        opened={opened}
        {...this.props}
      >
        {this.props.children}
      </Menu>
    );
  }
}
