import Component from 'components/component';
import css from 'helpers/styles/css';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Column extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    spacingHor: PropTypes.number,
    spacingVer: PropTypes.number,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  getStyles () {
    const styles = {
      root: {}
    };

    const {spacingHor, spacingVer} = this.props;

    css(styles.root)
      .setProperty('margin', `${spacingVer}px ${spacingHor}px`);

    return styles;
  }

  render () {
    const {styleClassMap, relax, Element, renderChildren} = this.props;
    const styles = this.getStyles();

    return (
      <Element
        {...relax}
        htmlTag='div'
        className={styleClassMap.root}
        style={styles.root}
        settings={settings}
      >
        {renderChildren()}
      </Element>
    );
  }
}
