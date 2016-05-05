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
    usePadding: PropTypes.bool,
    padding: PropTypes.string,
    useAlign: PropTypes.bool,
    textAlign: PropTypes.string,
    children: PropTypes.node,
    styleClassMap: PropTypes.object,
    useTrim: PropTypes.bool,
    maxWidth: PropTypes.number,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    padding: '0px',
    textAlign: 'left',
    maxWidth: 200
  };

  static defaultChildren = 'Click to edit text';

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

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

  onChange (value) {
    const {relax} = this.props;
    relax.dispatch(changeElementContent(relax.element.id, value));
  }

  render () {
    const {relax} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        settings={settings}
        style={this.getStyle()}
      >
        {this.renderContent()}
      </Element>
    );
  }

  renderContent () {
    let result;
    const classMap = this.props.styleClassMap;
    const {editing, selected} = this.props.relax;
    const styles = {};
    const className = cx(classes.text, classMap.text);

    let html = '';
    if ((!this.props.children || this.props.children === '') && editing && !selected) {
      html = 'Double click to edit text';
    } else {
      html = this.props.children;
    }

    if (this.props.useTrim) {
      styles.maxWidth = this.props.maxWidth;
    }

    if (editing && selected) {
      result = (
        <Editor
          tag='div'
          className={className}
          onChange={::this.onChange}
          value={html}
          options={{
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor']
            },
            placeholder: false,
            imageDragging: false
          }}
        />
      );
    } else {
      result = (
        <div
          className={cx(className, this.props.useTrim && classes.trim, editing && classes.cursor)}
          style={styles}
          dangerouslySetInnerHTML={{__html: html}}
        />
      );
    }
    return result;
  }
}
