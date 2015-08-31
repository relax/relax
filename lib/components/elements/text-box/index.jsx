import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';
import Editor from '../../medium-editor';

import settings from './settings';
import style from './style';
import classes from './classes';
import propsSchema from './props-schema';

export default class TextBox extends Component {

  getStyle () {
    let style = {};

    if (this.props.usePadding) {
      style.padding = this.props.padding;
    }
    if (this.props.useAlign) {
      style.textAlign = this.props.textAlign;
    }

    return style;
  }

  renderContent () {
    var classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};

    let html = '';
    if ((!this.props.children || this.props.children === '') && this.context.editing && !this.props.selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    if (this.context.editing && this.props.selected) {
      return (
        <Editor
          tag='div'
          className={cx(classes.text, classMap.text)}
          value={html}
          onChange={this.context.elementContentChange}
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
      return (
        <div className={cx(classes.text, classMap.text)} dangerouslySetInnerHTML={{__html: html}}></div>
      );
    }
  }

  render () {
    var props = {
      tag: 'div',
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
}

TextBox.contextTypes = {
  editing: React.PropTypes.bool.isRequired,
  elementContentChange: React.PropTypes.func.isRequired
};

TextBox.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  padding: React.PropTypes.string.isRequired,
  textAlign: React.PropTypes.string.isRequired
};

TextBox.defaultProps = {
  padding: '0px',
  textAlign: 'left'
};

TextBox.defaultChildren = 'Click to edit text';

styles.registerStyle(style);
TextBox.propsSchema = propsSchema;
TextBox.settings = settings;
