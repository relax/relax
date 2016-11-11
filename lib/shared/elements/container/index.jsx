import Component from 'components/component';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Container extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax} = this.props;
    const {Element} = this.context;

    const props = {
      ...relax,
      htmlTag: 'div',
      className: styleClassMap.container,
      settings
    };

    return (
      <div className={styleClassMap.holder}>
        <Element {...props}>
          {this.props.children}
        </Element>
      </div>
    );
  }
}
