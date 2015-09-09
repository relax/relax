import React from 'react';
import {Component} from 'relax-framework';
import Dropzone from 'dropzone';

export default class Upload extends Component {
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

Upload.propTypes = {
  action: React.PropTypes.string.isRequired,
  acceptedFiles: React.PropTypes.string,
  success: React.PropTypes.func
};
