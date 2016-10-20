import React, {PropTypes} from 'react';

import Button from './button';
import Component from 'components/component';
import Element from '../element';
import Spinner from 'components/spinner';
import classes from './classes';
import cx from 'classnames';
import get from 'lodash.get';
import settings from './settings';

export default class MenuElement extends Component {
  static propTypes = {
    menuData: PropTypes.object,
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    loading: PropTypes.bool
  };

  render () {
    const {relax, loading, menuData} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (!menuData) {
      result = this.renderEmpty();
    } else {
      result = this.renderMenu();
    }

    return (
      <Element htmlTag='div' settings={settings} {...relax}>
        {result}
      </Element>
    );
  }

  renderLoading () {
    const {editing} = this.props;

    if (editing) {
      return (
        <div>
          <Spinner />
          <span>Loading menu</span>
        </div>
      );
    }
  }

  renderEmpty () {
    const {editing} = this.props;

    if (editing) {
      return (
        <div>Choose a menu on the settings tab</div>
      );
    }
  }

  renderMenu () {
    const {styleClassMap, menuData} = this.props;
    const children = get(menuData, 'root.children', []);

    return (
      <ul className={cx(classes.menu, styleClassMap.menu)}>
        {children.map(this.renderButton, this)}
      </ul>
    );
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
