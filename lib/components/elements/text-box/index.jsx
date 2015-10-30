import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Editor from '../../medium-editor';
import Element from '../../element';

export default class TextBox extends Component {

  static propTypes = {
    selected: PropTypes.bool,
    usePadding: PropTypes.bool,
    padding: PropTypes.string,
    useAlign: PropTypes.bool,
    textAlign: PropTypes.string,
    children: PropTypes.node,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    element: PropTypes.object,
    elementId: PropTypes.string,
    styleClassMap: PropTypes.object
  }

  static defaultProps = {
    padding: '0px',
    textAlign: 'left'
  }

  static defaultChildren = 'Click to edit text'

  static propsSchema = propsSchema
  static settings = settings
  static style = style

  getStyle () {
    const result = {};

    if (this.props.usePadding) {
      result.padding = this.props.padding;
    }
    if (this.props.useAlign) {
      result.textAlign = this.props.textAlign;
    }

    return result;
  }

  render () {
    const props = {
      ...this.props,
      htmlTag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      style: this.getStyle()
    };

    return (
      <Element {...props}>
        {this.renderContent()}
      </Element>
    );
  }

  renderContent () {
    let result;
    const classMap = this.props.styleClassMap || {};
    const {editing} = this.props.pageBuilder;

    let html = '';
    if ((!this.props.children || this.props.children === '') && editing && !this.props.selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    if (editing && this.props.selected) {
      //
      result = (
        <Editor
          tag='div'
          className={cx(classes.text, classMap.text)}
          onChange={this.props.pageBuilderActions.changeElementContent.bind(this, this.props.elementId)}
          value={html}
          options={{
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor']
            },
            placeholder: false,
            buttonLabels: 'fontawesome',
            imageDragging: false
          }}
        />
      );
    } else {
      result = (
        <div className={cx(classes.text, classMap.text)} dangerouslySetInnerHTML={{__html: html}}></div>
      );
    }
    return result;
  }
}
