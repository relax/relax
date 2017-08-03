import Component from 'components/component';
import Link from 'components/link';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class LinkElement extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    link: PropTypes.object,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, styleClassMap, relax, link, renderChildren} = this.props;

    return (
      <Link link={link}>
        <Element
          {...relax}
          htmlTag='div'
          className={styleClassMap.root}
          settings={settings}
        >
          {renderChildren()}
        </Element>
      </Link>
    );
  }
}
