import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';

import settings from './settings';
import style from './style';
import propsSchema from './props-schema';
import classes from './classes';

export default class Icon extends Component {
  render () {
    let classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};
    var props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      style: {
        textAlign: this.props.align
      }
    };

    return (
      <Element {...props}>
        <div className={cx(classes.holder, classMap.holder)}>
          <i className={cx(this.props.icon, classMap.icon)} style={style}></i>
        </div>
      </Element>
    );
  }
}

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  style: React.PropTypes.any.isRequired
};

Icon.defaultProps = {
  icon: 'fa fa-beer',
  align: 'center'
};

styles.registerStyle(style);
Icon.propsSchema = propsSchema;
Icon.settings = settings;
