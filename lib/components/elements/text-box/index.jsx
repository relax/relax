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
    styleClassMap: PropTypes.object,
    useTrim: PropTypes.bool,
    maxWidth: PropTypes.number
  }

  static defaultProps = {
    padding: '0px',
    textAlign: 'left',
    maxWidth: 200
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
      info: this.props,
      htmlTag: 'div',
      settings: settings,
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
    const editing = this.props.pageBuilder && this.props.pageBuilder.editing;
    const styles = {};
    const className = cx(classes.text, classMap.text);

    let html = '';
    if ((!this.props.children || this.props.children === '') && editing && !this.props.selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    if (this.props.useTrim) {
      styles.maxWidth = this.props.maxWidth;
    }

    if (editing && this.props.selected) {
      result = (
        <Editor
          tag='div'
          className={className}
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
        <div className={cx(className, this.props.useTrim && classes.trim, editing && classes.cursor)} style={styles} dangerouslySetInnerHTML={{__html: html}}></div>
      );
    }
    return result;
  }
}
