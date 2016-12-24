import Component from 'components/component';
import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class TextBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    tag: PropTypes.string
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired,
    ElementText: PropTypes.func.isRequired
  };

  static defaultProps = {
    tag: 'p'
  };

  static defaultChildren = 'Click to edit text';

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {relax} = this.props;
    const {Element} = this.context;
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
    const {styleClassMap, relax, children, tag} = this.props;
    const {editing, selected} = relax;
    const {ElementText} = this.context;

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
        tag={tag}
      />
    );
  }
}
