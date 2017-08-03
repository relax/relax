import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import MenuLink from 'components/menu-link';
import classes from './classes';
import cx from 'classnames';

export default class MenuElementSubButton extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object.isRequired,
    button: PropTypes.object.isRequired,
    editing: PropTypes.bool
  };

  render () {
    const {styleClassMap, button, editing} = this.props;

    return (
      <li
        className={cx(classes.submenuItem, styleClassMap.submenuEntry)}
      >
        <MenuLink
          {...button}
          editing={editing}
          className={cx(classes.submenuButton, styleClassMap.submenuButton)}
        />
      </li>
    );
  }
}
