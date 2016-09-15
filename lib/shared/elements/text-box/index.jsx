import bind from 'decorators/bind';
import cx from 'classnames';
import Editor from 'components/medium-editor';
import React, {PropTypes} from 'react';
import {changeElementContent} from 'actions/page-builder';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class TextBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultChildren = 'Click to edit text';

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  @bind
  onChange (value) {
    const {store} = this.context;
    const {relax} = this.props;
    store.dispatch(changeElementContent(relax.element.id, value, relax.context));
  }

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
    let result;
    const classMap = this.props.styleClassMap;
    const {editing, selected} = this.props.relax;
    const className = cx(classes.text, classMap.text);

    let html = '';
    if ((!this.props.children || this.props.children === '') && editing && !selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    if (editing && selected) {
      result = (
        <Editor
          tag='div'
          className={className}
          onChange={this.onChange}
          value={html}
        />
      );
    } else {
      result = (
        <div
          className={cx(className, editing && classes.cursor)}
          dangerouslySetInnerHTML={{__html: html}}
        />
      );
    }

    return result;
  }
}
