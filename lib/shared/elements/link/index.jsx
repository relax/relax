import Link from 'components/link';
import React, {PropTypes} from 'react';

import Component from '../component';
import Element from '../element';
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

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, link, children} = this.props;

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
