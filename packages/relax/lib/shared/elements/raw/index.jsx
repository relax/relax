import Component from 'components/component';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class RawElement extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    children: PropTypes.any
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
