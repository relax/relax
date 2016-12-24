import Component from 'components/component';
import Link from 'components/link';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class LineDivider extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    link: PropTypes.object,
    children: PropTypes.any
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, link, children} = this.props;
    const {Element} = this.context;

    return (
      <Link link={link}>
        <Element
          {...relax}
          htmlTag='div'
          className={styleClassMap.root}
          settings={settings}
        >
          {children}
        </Element>
      </Link>
    );
  }
}
