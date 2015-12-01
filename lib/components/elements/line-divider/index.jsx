import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';

export default class LineDivider extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    element: PropTypes.object.isRequired
  }

  static propsSchema = propsSchema
  static settings = settings
  static style = style

  render () {
    const classMap = this.props.styleClassMap || {};

    return (
      <Element info={this.props} htmlTag='div' className={cx(classes.holder, classMap.holder)} settings={settings}>
        <div className={cx(classes.line, classMap.line)}></div>
      </Element>
    );
  }
}
