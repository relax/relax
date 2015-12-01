import cx from 'classnames';
import forEach from 'lodash.foreach';
import Q from 'q';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Breadcrumbs from '../../../breadcrumbs';
import FontsList from './fonts-list';
import Input from '../../../data-types/input';
import Lightbox from '../../../lightbox';
import Mananger from './manager';

export default class Fonts extends Component {
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  }

  static propTypes = {
    breadcrumbs: PropTypes.array,
    fonts: PropTypes.object,
    changeFontsPreviewText: PropTypes.func.isRequired,
    changeFontsPreviewLayout: PropTypes.func.isRequired,
    changeFontInputAndUpdate: PropTypes.func.isRequired,
    submitCustomFont: PropTypes.func.isRequired,
    removeCustomFont: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      loading: false,
      manager: false
    };
  }

  static settings = [
    'fonts'
  ]

  save () {
    // settingsActions.saveSettings({fonts: this.props.fonts});
  }

  removeCustomFont (family) {
    forEach(this.props.fonts.customFonts, (obj, index) => {
      if (obj.family === family) {
        // fontsActions.remove(obj.id);

        this.props.fonts.customFonts.splice(index, 1);

        var ind = this.props.fonts.webfontloader.custom.families.indexOf(family);
        if (ind !== -1) {
          this.props.fonts.webfontloader.custom.families.splice(ind, 1);
        }

        this.loadFonts();

        return false;
      }
    });
  }

  onCustomSubmit (title, files, types) {
    return Q()
      // .then(() => fontsActions.submit(files))
      .then((id) => {
        // All good -> process
        var webfontloader = this.props.fonts.webfontloader;
        this.state.customError = false;

        // map types to file
        var map = {};
        for (var a = 0; a < files.length; a++) {
          map[types[a]] = files[a].name;
        }

        let rule = `
          font-family: '${title}';
          src: url('/fonts/${id}/${map.eot}');
          src:
        `;

        // try woff2
        var woff2 = types.indexOf('woff2');
        if (woff2 !== -1) {
          rule += `url('/fonts/${id}/${map.woff2}'), `;
        }
        rule += `url('/fonts/${id}/${map.woff}'), `;
        rule += `url('/fonts/${id}/${map.ttf}');`;

        var s = document.createElement('style');
        s.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(s);

        var css = `@font-face {${rule}}`;
        if (s.styleSheet) {
          s.styleSheet.cssText = css;
        } else {
          s.appendChild(document.createTextNode(css));
        }

        webfontloader.custom = webfontloader.custom || { families: [] };
        webfontloader.custom.families.push(title);

        this.props.fonts.customFonts = this.props.fonts.customFonts || [];
        this.props.fonts.customFonts.push({
          family: title,
          files: map,
          id: id
        });

        this.loadFonts();

        return true;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openManager (event) {
    event.preventDefault();
    this.setState({
      manager: true
    });
  }

  closeManager () {
    this.setState({
      manager: false
    });
  }

  render () {
    return (
      <div>
        <div className='filter-menu'>
          <Breadcrumbs data={this.props.breadcrumbs} />
          <a href='#' className={cx('button-clean', this.props.fonts.previewLayout === 'list' && 'active')} onClick={this.props.changeFontsPreviewLayout.bind(this, 'list')}>
            <i className='material-icons'>list</i>
            <span>List</span>
          </a>
          <a href='#' className={cx('button-clean', this.props.fonts.previewLayout === 'grid' && 'active')} onClick={this.props.changeFontsPreviewLayout.bind(this, 'grid')}>
            <i className='material-icons'>grid_on</i>
            <span>Grid</span>
          </a>
          <a href='#' className='button-clean' onClick={this.openManager.bind(this)}>
            <i className='material-icons'>font_download</i>
            <span>Add fonts</span>
          </a>
          <div className='filter-right'>
            <span className='label-filter'>Preview text</span>
            <Input type='text' value={this.props.fonts.previewText} onChange={this.props.changeFontsPreviewText} />
          </div>
        </div>
        <div className='admin-scrollable'>
          <FontsList fonts={this.props.fonts} loading={this.state.loading} />
        </div>
        {this.renderManager()}
      </div>
    );
  }

  renderManager () {
    if (this.state.manager) {
      return (
        <Lightbox title='Manage fonts' onClose={this.closeManager.bind(this)}>
          <Mananger fonts={this.props.fonts} changeFontInputAndUpdate={this.props.changeFontInputAndUpdate} submitCustomFont={this.props.submitCustomFont} removeCustomFont={this.props.removeCustomFont} />
        </Lightbox>
      );
    }
  }
}
