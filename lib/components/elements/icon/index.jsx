import cx from 'classnames';
import React from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';

export default class Icon extends Component {
  static propTypes = {
    icon: React.PropTypes.object.isRequired,
    align: React.PropTypes.string.isRequired,
    styleClassMap: React.PropTypes.object
  }

  static defaultProps = {
    icon: {
      family: 'fontawesome',
      className: 'fa fa-beer'
    },
    align: 'center'
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
      style: {
        textAlign: this.props.align
      }
    };

    return (
      <Element {...props}>
        <div className={cx(classes.holder, classMap.holder)}>
          <i className={cx(this.props.icon && this.props.icon.className, classMap.icon)}>
            {this.props.icon && this.props.icon.content}
          </i>
        </div>
      </Element>
    );
  }
}
