import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';

import settings from './settings';
import style from './style';
import propsSchema from './props-schema';

export default class Container extends Component {
  render () {
    let classMap = this.props.style && styles.getClassesMap(this.props.style);
    let className = classMap && classMap.container || '';
    let classNameHolder = classMap && classMap.holder || '';

    let props = {
      tag: 'div',
      style: {
        position: 'relative'
      },
      className,
      settings: this.constructor.settings,
      element: this.props.element
    };

    return (
      <div className={classNameHolder}>
        <Element {...props}>
          {this.props.children}
        </Element>
      </div>
    );
  }
}

Container.propTypes = {};
Container.defaultProps = {};

styles.registerStyle(style);
Container.propsSchema = propsSchema;
Container.settings = settings;
