import classNames from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import Editor from '../medium-editor';

export default class HtmlArea extends Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  }

  render () {
    return (
      <div className={classNames('html-area', this.props.className)}>
        <Editor
          tag='div'
          className='html-editor'
          value={this.props.value}
          onChange={this.props.onChange}
          options={{
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor']
            },
            placeholder: false,
            buttonLabels: 'fontawesome',
            imageDragging: false
          }}
        />
      </div>
    );
  }
}
