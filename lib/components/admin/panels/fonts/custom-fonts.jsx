import forEach from 'lodash.foreach';
import React from 'react';
import {Component} from 'relax-framework';

import Font from './font';
import Upload from '../../../upload';
import Utils from '../../../../utils';

export default class CustomFonts extends Component {
  static propTypes = {
    removeCustomFont: React.PropTypes.func.isRequired,
    submitCustomFont: React.PropTypes.func.isRequired,
    customFonts: React.PropTypes.array.isRequired,
    previewText: React.PropTypes.string.isRequired
  }

  getInitState () {
    return {
      customLoading: false,
      customError: false,
      titleInput: '',
      files: []
    };
  }

  removeCustomFont (id, event) {
    event.preventDefault();
    this.props.removeCustomFont(id);
  }

  submitCustomFont (event) {
    event.preventDefault();

    // Validation of parameters
    if (this.state.titleInput === '') {
      this.setState({
        customError: 'Fill in your custom font family title'
      });
      return;
    }

    if (this.state.files.length === 0) {
      this.setState({
        customError: 'You haven\'t upload any font files'
      });
      return;
    }

    // Get each font file type
    const types = [];
    const filesInfo = [];
    const files = this.state.files;
    const re = /(?:\.([^.]+))?$/;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.name && file.xhr && file.xhr.response) {
        const type = re.exec(file.name)[1];

        if (type !== undefined) {
          types.push(type);
        }

        // server response
        filesInfo.push((JSON.parse(file.xhr.response)).data.uploadFont);
      }
    }

    // At least woff is needed
    const woff = types.indexOf('woff');
    if (woff === -1) {
      this.setState({
        customError: 'You need to upload the .woff font file type'
      });
      return;
    }

    // .eot needed for ie9
    const eot = types.indexOf('eot');
    if (eot === -1) {
      this.setState({
        customError: 'You need to upload the .eot font file as well to support IE9'
      });
      return;
    }

    // .ttf
    const ttf = types.indexOf('ttf');
    if (ttf === -1) {
      this.setState({
        customError: 'Upload the ttf format to support Safari, Android and iOS'
      });
      return;
    }

    this.props
      .submitCustomFont(this.state.titleInput, filesInfo, types)
      .then(() => {
        forEach(this.state.files, (file) => {
          file.previewElement.parentNode.removeChild(file.previewElement);
        });

        this.setState({
          titleInput: '',
          files: []
        });
      })
      .catch((error) => {
        this.setState({
          customError: `Error uploading fonts: ${error}`
        });
      });
  }

  onTitleChange (event) {
    this.setState({
      titleInput: event.target.value
    });
  }

  customFontFileSuccess (file) {
    this.state.files.push(file);
  }

  customFontFileRemove (file) {
    const files = this.state.files;
    let index = -1;
    for (var i = 0; i < files.length; i++) {
      if (files[i].name === file.name) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      this.state.files.splice(index, 1);
      this.refs.uploadedFonts.querySelector(file.previewElement).remove();
    }
  }

  render () {
    return (
      <div className='fonts-manager-custom'>
        <div className='fonts-manager-custom-list'>
          {this.renderList()}
        </div>
        <div className='fonts-manager-custom-new-header'>
          Add new custom font
        </div>
        <div className='fonts-manager-custom-new'>
          <div className='fonts-manager-custom-new-left'>
            <div className='option_label'>Font title</div>
            <input type='text' value={this.state.titleInput} onChange={this.onTitleChange.bind(this)} />
          </div>
          <div className='fonts-manager-custom-new-right' ref='uploadedFonts'>
            <Upload
              action='/graphql'
              success={this.customFontFileSuccess.bind(this)}
              removedfile={this.customFontFileRemove.bind(this)}
              acceptedFiles='.eot,.svg,.ttf,.woff,.woff2'
              addRemoveLinks
              dictRemoveFile=' '
              dictCancelUpload=' '
              dictCancelUploadConfirmation=' '
              dictDefaultMessage='Drop your font files here'
              query={
                `
                  mutation uploadFont {
                    uploadFont {
                      originalname,
                      mimetype,
                      destination,
                      filename,
                      path,
                      size
                    }
                  }
                `
              }
            />
          </div>

          <div className='fonts-manager-custom-new-footer'>
            <a href='#' onClick={this.submitCustomFont.bind(this)}>Submit custom font</a>
            {this.renderError()}
          </div>
        </div>
        {this.renderCover()}
      </div>
    );
  }

  renderList () {
    if (this.props.customFonts && this.props.customFonts.length > 0) {
      const customFonts = [];

      forEach(this.props.customFonts, (customFont) => {
        const family = customFont.family;
        customFonts.push(
          <div className='list-font' key={family}>
            <Font family={family} fvd='n4' text={this.props.previewText} />
            <div className='list-font-footer'>
              <p className='list-font-family'>{Utils.filterFontFamily(family)}</p>
              <p className='list-font-variation'>Custom font</p>
            </div>
            <a href='#' className='list-font-remove' onClick={this.removeCustomFont.bind(this, customFont.id)}>
              <i className='material-icons'>close</i>
            </a>
          </div>
        );
      });

      return customFonts;
    }
  }

  renderCover () {
    if (this.state.customLoading) {
      return (
        <div className='tons-list-cover'>
          <p>Loading your fonts</p>
        </div>
      );
    }
  }

  renderError () {
    if (this.state.customError !== false) {
      return (
        <span>{this.state.customError}</span>
      );
    }
  }
}
