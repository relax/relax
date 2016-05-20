import * as adminMenuActions from 'actions/admin-menu';

import bind from 'decorators/bind';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Menu from './menu';

@dataConnect(
  (state) => ({
    adminMenuOpened: state.adminMenu,
    routes: state.router.routes,
    params: state.router.params
  }),
  (dispatch) => bindActionCreators(adminMenuActions, dispatch),
  () => ({
    fragments: Menu.fragments,
    mutations: {
      addSchema: [{
        type: 'APPEND',
        field: 'schemas'
      }]
    }
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    adminMenuOpened: PropTypes.bool.isRequired,
    openAdminMenu: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    schemas: []
  };

  static menuData = [
    {
      name: 'adminSettings',
      label: 'General Settings',
      icon: 'nc-icon-outline ui-1_preferences-container',
      link: '/admin/settings'
    },
    'sep',
    {
      name: 'adminPages',
      label: 'Pages',
      icon: 'nc-icon-outline design_window-paragraph',
      link: '/admin/pages'
    },
    {
      name: 'adminTemplates',
      label: 'Templates',
      icon: 'nc-icon-outline ui-2_webpage',
      link: '/admin/templates'
    },
    'sep',
    {
      name: 'adminMedia',
      label: 'Media',
      icon: 'nc-icon-outline media-1_album',
      link: '/admin/media'
    },
    {
      name: 'adminMenus',
      label: 'Menus',
      icon: 'nc-icon-outline design_bullet-list-67',
      link: '/admin/menus'
    },
    {
      name: 'adminFonts',
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

  @bind
  onActiveClick () {
    this.props.openAdminMenu();
  }

  render () {
    const {routes} = this.props;
    let active = false;
    if (routes.length >= 2) {
      forEach(MenuContainer.menuData, (entry) => {
        if (entry !== 'sep' && entry.name === routes[1].name) {
          active = entry.label;
        }
      });

      if (routes.length > 2 && (routes[2].name === 'adminSingleSchema' || routes[2].name === 'adminDataSchema')) {
        const {params} = this.props;
        active = params.id;
      }
    }

    const opened = this.props.adminMenuOpened && active && this.props.children && true;

    return (
      <Menu
        menuData={MenuContainer.menuData}
        active={active}
        onActiveClick={this.onActiveClick}
        opened={opened}
        {...this.props}
      >
        {this.props.children}
      </Menu>
    );
  }
}
