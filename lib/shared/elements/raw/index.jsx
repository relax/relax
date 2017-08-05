import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class RawElement extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, styleClassMap, relax, renderChildren} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        className={styleClassMap.root}
        settings={settings}
      >
        {renderChildren()}
      </Element>
    );
  }
}
