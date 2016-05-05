import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class TextInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, name, placeholder} = this.props;

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
