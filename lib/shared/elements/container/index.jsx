import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Container extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, styleClassMap, relax, renderChildren} = this.props;

    const props = {
      ...relax,
      htmlTag: 'div',
      className: styleClassMap.container,
      settings
    };

    return (
      <div className={styleClassMap.holder}>
        <Element {...props}>
          {renderChildren()}
        </Element>
      </div>
    );
  }
}
