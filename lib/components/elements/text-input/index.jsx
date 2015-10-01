import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';

import settings from './settings';
import propsSchema from './props-schema';
import style from './style';
import classes from './classes';

export default class TextInput extends Component {
  render () {
    let classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};
    let props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      className: cx(classes.holder, classMap.holder)
    };

    return (
      <Element {...props}>
        <input type='text' name={this.props.name} placeholder={this.props.placeholder} className={cx(classes.input, classMap.input)}></input>
      </Element>
    );
  }
}

TextInput.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string
};
TextInput.defaultProps = {};

styles.registerStyle(style);
TextInput.propsSchema = propsSchema;
TextInput.settings = settings;
