import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class LineDivider extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, Element} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        className={cx(classes.holder, styleClassMap.holder)}
        settings={settings}
      >
        <div className={cx(classes.line, styleClassMap.line)}></div>
      </Element>
    );
  }
}
