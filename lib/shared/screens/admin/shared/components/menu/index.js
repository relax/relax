import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Menu from './menu';

@dataConnect()
@connect(
  (state) => ({
    schemas: state.schemas.data.items
  })
)
export default class MenuContainer extends Component {
  static propTypes = {
    active: PropTypes.string,
    opened: PropTypes.bool,
    schemas: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
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
      label: 'Colors',
      icon: 'nc-icon-outline design_palette',
      link: '/admin/colors'
    },
    {
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

  render () {
    const {active, schemas, opened} = this.props;

    return (
      <Menu
        menuData={MenuContainer.menuData}
        active={active}
        schemas={schemas}
        opened={opened}
      >
        {this.props.children}
      </Menu>
    );
  }
}
