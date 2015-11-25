import Dropzone from 'dropzone';
import ReactDropzone from 'react-dropzone';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

export default class Upload extends Component {
  static propTypes = {
    action: PropTypes.string,
    acceptedFiles: PropTypes.string,
    success: PropTypes.func,
    children: PropTypes.node,
    query: PropTypes.string,
    onFile: PropTypes.func,
    disableClick: PropTypes.bool
  }

  static defaultProps = {
    acceptedFiles: 'image/*,video/*,audio/*',
    disableClick: false
  }

  componentDidMount () {
    if (typeof document !== 'undefined' && this.props.action) {
      var options = {};
      for (var opt in Dropzone.prototype.defaultOptions) {
        var prop = this.props[opt];
        if (prop) {
          options[opt] = prop;
          continue;
        }
        options[opt] = Dropzone.prototype.defaultOptions[opt];
      }

      this.dropzone = new Dropzone(findDOMNode(this), options);

      if (this.props.query) {
        this.dropzone.on('sending', (file, xhr, formData) => {
          formData.append('query', this.props.query);
        });
      }
    }
  }

  componentWillUnmount () {
    if (this.props.action) {
      this.dropzone.destroy();
      this.dropzone = null;
    }
  }

  onDrop (files) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.props.onFile({
          file: event.target.result,
          filename: file.name
        }, file);
      };
      reader.readAsDataURL(file);
    });
  }

  render () {
    var result;

    if (this.props.action) {
      result = (
        <form className='dropzone' action={this.props.action} encType='multipart/form-data'>
          {this.props.children}
        </form>
      );
    } else {
      result = (
        <ReactDropzone className='dropzone' activeClassName='dropzone-active' onDrop={::this.onDrop} disableClick={this.props.disableClick}>
          {this.props.children}
        </ReactDropzone>
      );
    }

    return result;
  }
}
