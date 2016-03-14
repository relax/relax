import classNames from 'classnames';
import Component from 'components/component';
import Editor from 'components/medium-editor';
import React, {PropTypes} from 'react';

export default class HtmlArea extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
  };

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
            imageDragging: false
          }}
        />
      </div>
    );
  }
}
