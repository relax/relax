import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'relax-framework';
import Dropzone from 'dropzone';

export default class Upload extends Component {
  componentDidMount () {
    super.componentDidMount();
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

      options.acceptedFiles = 'image/*,video/*,audio/*';

      this.dropzone = new Dropzone(ReactDOM.findDOMNode(this), options);
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
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
