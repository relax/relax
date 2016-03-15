import cx from 'classnames';
import Component from 'components/component';
import ReactDropzone from 'react-dropzone';
import React, {PropTypes} from 'react';

export default class Upload extends Component {
  static propTypes = {
    accept: PropTypes.string,
    clickable: PropTypes.bool,
    children: PropTypes.node,
    onFile: PropTypes.func.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    rejectClassName: PropTypes.string,
    showInfos: PropTypes.bool
  };

  static defaultProps = {
    accept: 'image/*,video/*,audio/*',
    clickable: true,
    droppable: true,
    showInfos: true
  };

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
    const {className, activeClassName, rejectClassName} = this.props;

    return (
      <ReactDropzone
        className={cx(className || 'dropzone')}
        activeClassName={cx(activeClassName || 'dropzone-active')}
        rejectClassName={cx(rejectClassName || 'dropzone-reject')}
        onDropAccepted={::this.onDrop}
        disableClick={!this.props.clickable}
        accept={this.props.accept}
      >
        {this.renderInfos()}
        {this.props.children}
      </ReactDropzone>
    );
  }

  renderInfos () {
    if (this.props.showInfos) {
      return (
        <div>
          <div className='dropzone-info'>Release your file(s) to upload</div>
          <div className='dropzone-error'>You're dragging invalid files</div>
        </div>
      );
    }
  }
}
