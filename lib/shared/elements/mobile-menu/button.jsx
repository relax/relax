import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import MenuLink from 'components/menu-link';
import SubButton from './sub-button';
import classes from './classes';
import cx from 'classnames';

export default class MenuElementButton extends Component {
  static propTypes = {
    button: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    menuData: PropTypes.object.isRequired,
    editing: PropTypes.bool
  };

  render () {
    const {styleClassMap, button, editing} = this.props;

    return (
      <li className={styleClassMap.menuButtonLi}>
        <MenuLink
          {...button}
          editing={editing}
          className={cx(classes.menuButton, styleClassMap.menuButton)}
        />
        {this.renderSubMenu()}
      </li>
    );
  }

  renderSubMenu () {
    const {button, styleClassMap} = this.props;

    if (button.children) {
      return (
        <ul className={cx(classes.submenu, styleClassMap.submenu)}>
          {button.children.map(this.renderSubButton, this)}
        </ul>
      );
    }
  }

  renderSubButton (id) {
    const {styleClassMap, menuData, editing} = this.props;
    const button = menuData[id];

    return (
      <SubButton
        styleClassMap={styleClassMap}
        button={button}
        editing={editing}
        menuData={menuData}
        key={id}
      />
    );
  }
}
