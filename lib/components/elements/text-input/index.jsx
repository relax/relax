import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';

export default class TextInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    styleClassMap: PropTypes.object
  }

  static propsSchema = propsSchema
  static settings = settings
  static style = style

  render () {
    const classMap = this.props.styleClassMap || {};
    const props = {
      htmlTag: 'div',
      info: this.props,
      settings,
      className: cx(classes.holder, classMap.holder)
    };

    return (
      <Element {...props}>
        <input type='text' name={this.props.name} placeholder={this.props.placeholder} className={cx(classes.input, classMap.input)}></input>
      </Element>
    );
  }
}
