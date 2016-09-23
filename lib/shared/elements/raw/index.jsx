import React, {PropTypes} from 'react';
import Component from '../component';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Element from '../element';

export default class RawElement extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        className={styleClassMap.root}
        settings={settings}
      >
        {this.props.children}
      </Element>
    );
  }
}
