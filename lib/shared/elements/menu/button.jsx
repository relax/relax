import React from 'react';
import PropTypes from 'prop-types';

import Animate from 'components/animate';
import Component from 'components/component';
import MenuLink from 'components/menu-link';
import SubButton from './sub-button';
import bind from 'decorators/bind';
import classes from './classes';
import cx from 'classnames';

export default class MenuElementButton extends Component {
  static propTypes = {
    button: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    menuData: PropTypes.object.isRequired,
    editing: PropTypes.bool
  };

  getInitState () {
    return {
      opened: false
    };
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimeout);
  }

  @bind
  onMouseOver () {
    clearTimeout(this.closeTimeout);
    this.setState({
      opened: true
    });
  }

  @bind
  onMouseOut () {
    this.closeTimeout = setTimeout(this.close, 400);
  }

  @bind
  close () {
    this.setState({
      opened: false
    });
  }

  render () {
    const {styleClassMap, button, editing} = this.props;

    return (
      <li
        className={cx(classes.menuItem, styleClassMap.entry)}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <MenuLink
          {...button}
          editing={editing}
          className={cx(classes.button, styleClassMap.button)}
        />
        {this.renderSubMenu()}
      </li>
    );
  }

  renderSubMenu () {
    const {button, styleClassMap} = this.props;
    const {opened} = this.state;

    if (button.children && opened) {
      return (
        <Animate transition='fadeIn'>
          <ul className={cx(classes.submenu, styleClassMap.submenu)}>
            {button.children.map(this.renderSubButton, this)}
          </ul>
        </Animate>
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
