import cx from 'classnames';
import React, {PropTypes} from 'react';

import Component from '../component';
import Element from '../element';
import ElementText from '../element-text';
import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class TextBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static defaultChildren = 'Click to edit text';

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {relax} = this.props;
    const classMap = this.props.styleClassMap;

    return (
      <Element
        {...relax}
        htmlTag='div'
        settings={settings}
        className={classMap.holder}
      >
        {this.renderContent()}
      </Element>
    );
  }

  renderContent () {
    const {styleClassMap, relax, children} = this.props;
    const {editing, selected} = relax;

    let html = '';
    if (!children && editing && !selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    return (
      <ElementText
        className={cx(classes.text, styleClassMap.text)}
        relax={relax}
        value={html}
      />
    );
  }
}
