import Component from 'components/component';
import Portal from 'components/portal';
import bind from 'decorators/bind';
import cx from 'classnames';
import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import classes from './classes';
import settings from './settings';

export default class MobileMenuElement extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    menuData: PropTypes.object,
    styleClassMap: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    loading: PropTypes.bool,
    Element: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      opened: false
    };
  }

  @bind
  toggleOpened () {
    this.setState({
      opened: !this.state.opened
    });
  }

  render () {
    const {Element, relax, styleClassMap} = this.props;
    const icon = relax.styleValues.icon;

    return (
      <div>
        <Element
          htmlTag='div'
          settings={settings}
          {...relax}
          className={styleClassMap.root}
        >
          <i
            className={cx(classes.icon, styleClassMap.icon, icon && icon.className)}
            onClick={this.toggleOpened}
          />
        </Element>
        {this.renderOpened()}
      </div>
    );
  }

  renderOpened () {
    const {opened} = this.state;

    if (opened) {
      const {styleClassMap, menuData} = this.props;
      const children = get(menuData, 'root.children', []);

      return (
        <Portal attachTo='pb-canvas'>
          <ul className={cx(classes.menu, styleClassMap.menu)}>
            {children.map(this.renderButton, this)}
          </ul>
        </Portal>
      );
    }
  }

  renderButton (id) {
    const {styleClassMap, menuData, editing} = this.props;
    const button = menuData[id];

    return (
      <Button
        styleClassMap={styleClassMap}
        button={button}
        editing={editing}
        menuData={menuData}
        key={id}
      />
    );
  }
}
