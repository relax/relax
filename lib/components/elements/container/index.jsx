import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';

export default class Container extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    element: PropTypes.object.isRequired,
    children: PropTypes.node
  }

  static propsSchema = propsSchema
  static settings = settings
  static style = style

  render () {
    const classMap = this.props.styleClassMap || {};

    const props = {
      info: this.props,
      htmlTag: 'div',
      style: {
        position: 'relative'
      },
      className: classMap.container,
      settings: settings
    };

    return (
      <div className={classMap.holder}>
        <Element {...props}>
          {this.props.children}
        </Element>
      </div>
    );
  }
}
