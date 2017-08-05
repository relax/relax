import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import ReactDropzone from 'react-dropzone';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Upload extends Component {
  static propTypes = {
    accept: PropTypes.string,
    clickable: PropTypes.bool,
    children: PropTypes.node,
    onFiles: PropTypes.func.isRequired,
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

  @bind
  onDrop (files) {
    this.props.onFiles(files);
  }

  render () {
    const {className, activeClassName, rejectClassName} = this.props;

    return (
      <ReactDropzone
        className={cx(className || 'dropzone')}
        activeClassName={cx(activeClassName || styles.active)}
        rejectClassName={cx(rejectClassName || styles.reject)}
        onDropAccepted={this.onDrop}
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
          <div className={styles.canDrop}>Release your file(s) to upload</div>
          <div className={styles.cannotDrop}>You're dragging invalid files</div>
        </div>
      );
    }
  }
}
