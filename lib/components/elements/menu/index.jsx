import React from 'react';
import cx from 'classnames';
import styles from '../../../styles';
import Component from '../../component';
import Element from '../../element';

import settings from './settings';
import classes from './classes';
import style from './style';
import propsSchema from './props-schema';
import Entry from './entry';

import menusStore from '../../../client/stores/menus';

export default class Menu extends Component {
  getInitialModels (props = false) {
    props = props || this.props;
    let models = {};

    if (props.menu && props.menu !== '') {
      models.menu = menusStore.getModel(props.menu);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.menu !== this.props.menu) {
      this.setModels(this.getInitialModels(nextProps));
    }
  }

  renderEntry (entry) {
    return <Entry entry={entry} subitem={false} classMap={this.classMap} classes={classes} key={entry.id} />;
  }

  renderMenu () {
    if (this.state.menu && this.state.menu.data) {
      return (
        <ul className={cx(classes.menu, this.classMap.menu)}>
          {this.state.menu.data.map(this.renderEntry, this)}
        </ul>
      );
    } else if (this.context.editing) {
      return (
        <div>Choose a menu on settings</div>
      );
    }
  }

  render () {
    this.classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};

    return (
      <Element tag='div' settings={this.constructor.settings} element={this.props.element}>
        {this.renderMenu()}
      </Element>
    );
  }
}

Menu.propTypes = {
  menu: React.PropTypes.string
};

Menu.contextTypes = {
  editing: React.PropTypes.bool
};

styles.registerStyle(style);
Menu.propsSchema = propsSchema;
Menu.settings = settings;
