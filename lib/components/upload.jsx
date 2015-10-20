import React from 'react';
import {Component} from 'relax-framework';
import Dropzone from 'dropzone';

export default class Upload extends Component {
  static propTypes = {
    action: React.PropTypes.string.isRequired,
    acceptedFiles: React.PropTypes.string,
    success: React.PropTypes.func,
    children: React.PropTypes.node,
    query: React.PropTypes.string
  }

  static defaultProps = {
    acceptedFiles: 'image/*,video/*,audio/*'
  }

  componentDidMount () {
    if (typeof document !== 'undefined') {
      var options = {};
      for (var opt in Dropzone.prototype.defaultOptions) {
        var prop = this.props[opt];
        if (prop) {
          options[opt] = prop;
          continue;
        }
        options[opt] = Dropzone.prototype.defaultOptions[opt];
      }

      this.dropzone = new Dropzone(React.findDOMNode(this), options);

      if (this.props.query) {
        this.dropzone.on('sending', (file, xhr, formData) => {
          formData.append('query', this.props.query);
        });
      }
    }
  }

  componentWillUnmount () {
    this.dropzone.destroy();
    this.dropzone = null;
  }

  render () {
    return (
      <form className='dropzone' action={this.props.action} encType='multipart/form-data'>
        {this.props.children}
      </form>
    );
  }
}
