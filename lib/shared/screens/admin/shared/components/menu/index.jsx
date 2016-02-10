import cx from 'classnames';
import A from 'components/a';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import styles from './index.less';
import Button from './button';
import ContentTypes from './content-types';
import User from './user';

export default class Menu extends Component {
  static propTypes = {
    active: PropTypes.string
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

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.menu}>
          <div className={styles.menuContent}>
            {Menu.menuData.map(this.renderEntry, this)}
            <ContentTypes key='content-types' />
          </div>
          <User user={{name: 'Bruno Mota', email: 'bruno12mota@gmail.com'}} />
        </div>
        <div className={styles.list}>

        </div>
      </div>
    );
  }

  renderEntry (entry, key) {
    let result;
    if (entry === 'sep') {
      result = <div className={styles.sepperator}/>;
    } else {
      result = (
        <Button {...entry} active={this.props.active === entry.label} key={key} />
      );
    }
    return result;
  }
}
