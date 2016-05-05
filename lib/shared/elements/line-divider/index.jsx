import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class LineDivider extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
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
        className={cx(classes.holder, styleClassMap.holder)}
        settings={settings}
      >
        <div className={cx(classes.line, styleClassMap.line)}></div>
      </Element>
    );
  }
}
