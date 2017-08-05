import React from 'react';
import PropTypes from 'prop-types';

import Component from 'components/component';
import MenuLink from 'components/menu-link';

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
        className={styleClassMap.submenuEntry}
      >
        <MenuLink
          {...button}
          editing={editing}
          className={styleClassMap.submenuButton}
        />
      </li>
    );
  }
}
