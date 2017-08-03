import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class TextInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, styleClassMap, relax, name, placeholder} = this.props;

    return (
      <Element
        htmlTag='div'
        {...relax}
        settings={settings}
        className={cx(classes.holder, styleClassMap.holder)}
      >
        <input
          type='text'
          name={name}
          placeholder={placeholder}
          className={cx(classes.input, styleClassMap.input)}
        />
      </Element>
    );
  }
}
