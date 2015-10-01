import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';

import settings from './settings';
import propsSchema from './props-schema';
import classes from './classes';

export default class Textarea extends Component {
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
        <textarea name={this.props.name} placeholder={this.props.placeholder} className={cx(classes.input, classMap.input)} rows={this.props.rows}></textarea>
      </Element>
    );
  }
}

Textarea.propTypes = {
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  rows: React.PropTypes.number
};
Textarea.defaultProps = {
  rows: 6
};

Textarea.propsSchema = propsSchema;
Textarea.settings = settings;
