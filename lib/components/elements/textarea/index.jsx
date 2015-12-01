import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';

export default class Textarea extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    styleClassMap: PropTypes.object
  }
  static defaultProps = {
    rows: 6
  }

  static propsSchema = propsSchema
  static settings = settings
  static style = 'input'

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
        <textarea name={this.props.name} placeholder={this.props.placeholder} className={cx(classes.input, classMap.input)} rows={this.props.rows}></textarea>
      </Element>
    );
  }
}
