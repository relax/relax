import {Component} from 'relax-framework';
import CustomFonts from './custom-fonts';
import FontsList from './fonts-list';
import merge from 'lodash.merge';
import React, {PropTypes} from 'react';
import forEach from 'lodash.foreach';
import Q from 'q';
import cx from 'classnames';

import Breadcrumbs from '../../../breadcrumbs';
import Input from '../../../input';
import Lightbox from '../../../lightbox';

const tabs = [
  {
    icon: 'fp-tab-ic fp-google',
    title: 'Google Fonts',
    lib: 'google',
    label: 'Google fonts fonts link'
  },
  {
    icon: 'fp-tab-ic fp-typekit',
    title: 'Typekit',
    lib: 'typekit',
    label: 'Typekit kit id'
  },
  {
    icon: 'fp-tab-ic fp-fontscom',
    title: 'Fonts.com',
    lib: 'monotype',
    label: 'Fonts.com project id'
  },
  {
    icon: 'fp-tab-ic fp-fontdeck',
    title: 'Font Deck',
    lib: 'fontdeck',
    label: 'Fontdeck project id'
  },
  {
    icon: 'fp-tab-icon fa fa-font',
    title: 'Custom Fonts',
    lib: 'custom'
  }
];

const defaults = {
  previewText: 'Abc',
  previewLayout: 'grid', // grid || list
  input: {
    google: {
      input: '',
      valid: false
    },
    typekit: {
      input: '',
      valid: false
    },
    fontdeck: {
      input: '',
      valid: false
    },
    monotype: {
      input: '',
      valid: false
    },
    custom: {
      input: '',
      valid: false
    }
  },
  customFonts: [],
  fonts: {},
  webfontloader: {}
};

export default class Fonts extends Component {
  static propTypes = {
    breadcrumbs: PropTypes.array
  }

  getInitialState () {
    var settings = this.parseSettings(this.context.settings);

    return {
      data: merge(defaults, settings.fonts || {}),
      tab: 0,
      loading: false,
      manager: false
    };
  }

  changeTab (tab, event) {
    event.preventDefault();

    this.setState({
      tab: tab
    });
  }

  save () {
    // settingsActions.saveSettings({fonts: this.state.data});
  }

  loadingFontsFinished () {
    this.state.data.fonts = merge({}, this.newFonts);
    this.newFonts = null;
    delete this.newFonts;

    this.save();

    this.setState({
      loading: false,
      data: this.state.data
    });
  }

  fontActive (familyName, fvd) {
    if (!this.newFonts[familyName]) {
      this.newFonts[familyName] = [];
    }

    this.newFonts[familyName].push(fvd);
  }

  loadFonts () {
    var events = {
      active: this.loadingFontsFinished.bind(this),
      fontactive: this.fontActive.bind(this)
    };

    this.newFonts = {};
    var params = merge({}, events, this.state.data.webfontloader);

    WebFont.load(params);

    this.setState({
      loading: true
    });
  }

  changedInput (value) {
    var inputData = this.state.data.input;
    var previousValid;

    this.state.data.webfontloader = this.state.data.webfontloader || {};
    var webfontloader = this.state.data.webfontloader;

    // Google fonts validation
    if (this.state.tab === 0) {
      previousValid = inputData.google.valid;
      inputData.google.input = value;
      inputData.google.valid = false;

      var paramsStr = value.split('?');

      // Not valid
      if (paramsStr.length !== 2) {
        return;
      }

      var params = {};
      var re = /[?&]?([^=]+)=([^&]*)/g;
      var tokens = re.exec(paramsStr[1]);

      while (tokens) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        tokens = re.exec(paramsStr[1]);
      }

      // Exists
      if (params.family) {
        inputData.google.valid = true;

        if (!webfontloader.google) {
          webfontloader.google = {
            families: []
          };
        } else {
          webfontloader.google.families = [];
        }

        // Object {family: "Lobster|Open+Sans:400,700", subset: "latin,cyrillic-ext,cyrillic"}
        var families = params.family.split('|');
        for (var i = 0; i < families.length; i++) {
          var googleFont = families[i];

          // Might not have multiple weights
          if (families[i].indexOf(':') === -1) {
            googleFont += ':';
          }

          if (params.subset) {
            googleFont += ':' + params.subset;
          } else {
            googleFont += ':latin';
          }

          webfontloader.google.families.push(googleFont);
        }

        this.loadFonts();
      }

      if (!inputData.google.valid && webfontloader.google) {
        delete webfontloader.google;
      }

      if (previousValid && !inputData.google.valid) {
        this.loadFonts();
      }
    } else if (this.state.tab === 1) {
      // Typekit validation
      previousValid = inputData.typekit.valid;
      inputData.typekit.input = value;
      inputData.typekit.valid = false;

      if (value.length === 7) {
        inputData.typekit.valid = true;

        webfontloader.typekit = webfontloader.typekit || {};

        webfontloader.typekit.id = value;
        this.loadFonts();
      }

      if (!inputData.typekit.valid && webfontloader.typekit) {
        delete webfontloader.typekit;
      }

      if (previousValid && !inputData.typekit.valid) {
        this.loadFonts();
      }
    } else if (this.state.tab === 2) {
      // Fonts.com (monotype) validation
      previousValid = inputData.monotype.valid;
      inputData.monotype.input = value;
      inputData.monotype.valid = false;

      if (value.length === 36) {
        var regex = new RegExp( /[0-9|a-z]{8}-[0-9|a-z]{4}-[0-9|a-z]{4}-[0-9|a-z]{4}-[0-9|a-z]{12}/g );
        inputData.monotype.valid = regex.test(value);
      }

      // valid
      if (inputData.monotype.valid) {
        webfontloader.monotype = webfontloader.monotype || {};

        webfontloader.monotype.projectId = value;
        this.loadFonts();
      } else if (webfontloader.monotype) {
        delete webfontloader.monotype;
      }

      if (previousValid && !inputData.monotype.valid) {
        this.loadFonts();
      }
    } else if (this.state.tab === 3) {
      // Font Deck validation
      previousValid = inputData.fontdeck.valid;
      inputData.fontdeck.input = value;
      inputData.fontdeck.valid = false;

      if (value.length === 5) {
        inputData.fontdeck.valid = true;
        webfontloader.fontdeck = webfontloader.fontdeck || {};

        webfontloader.fontdeck.id = value;
        this.loadFonts();
      }

      if (!inputData.fontdeck.valid && webfontloader.fontdeck) {
        delete webfontloader.fontdeck;
      }

      if (previousValid && !inputData.fontdeck.valid) {
        this.loadFonts();
      }
    }
  }

  onPreviewTextChange (event) {
    this.state.data.previewText = event.target.value;
    this.setState({
      data: this.state.data
    });
  }

  onPreviewLayoutChange (layout, event) {
    event.preventDefault();
    this.state.data.previewLayout = layout;
    this.setState({
      data: this.state.data
    });
  }


  removeCustomFont (family) {
    forEach(this.state.data.customFonts, (obj, index) => {
      if (obj.family === family) {
        // fontsActions.remove(obj.id);

        this.state.data.customFonts.splice(index, 1);

        var ind = this.state.data.webfontloader.custom.families.indexOf(family);
        if (ind !== -1) {
          this.state.data.webfontloader.custom.families.splice(ind, 1);
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
        var webfontloader = this.state.data.webfontloader;
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

        this.state.data.customFonts = this.state.data.customFonts || [];
        this.state.data.customFonts.push({
          family: title,
          files: map,
          id: id
        });

        this.loadFonts();

        return true;
      })
      .catch((error) => {
        console.log(error);
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
          <a href='#' className={cx('button-clean', this.state.data.previewLayout === 'list' && 'active')} onClick={this.onPreviewLayoutChange.bind(this, 'list')}>
            <i className='material-icons'>list</i>
            <span>List</span>
          </a>
          <a href='#' className={cx('button-clean', this.state.data.previewLayout === 'grid' && 'active')} onClick={this.onPreviewLayoutChange.bind(this, 'grid')}>
            <i className='material-icons'>grid_on</i>
            <span>Grid</span>
          </a>
          <a href='#' className='button-clean' onClick={this.openManager.bind(this)}>
            <i className='material-icons'>font_download</i>
            <span>Add fonts</span>
          </a>
          <div className='filter-right'>
            <span className='label-filter'>Preview text</span>
            <input type='text' value={this.state.data.previewText} onChange={this.onPreviewTextChange.bind(this)} />
          </div>
        </div>
        <div className='admin-scrollable'>
          <FontsList data={this.state.data} loading={this.state.loading} onPreviewTextChange={this.onPreviewTextChange.bind(this)} />
        </div>
        {this.renderManager()}
      </div>
    );
  }

  renderManager () {
    if (this.state.manager) {
      return (
        <Lightbox title='Manage fonts' onClose={this.closeManager.bind(this)}>
          <div className='fonts-manager'>
            <div className='fp-menu'>
              {tabs.map(this.renderTabButton.bind(this))}
            </div>
            <div className='fp-options'>
              {this.renderTabContent()}
            </div>
          </div>
        </Lightbox>
      );
    }
  }

  renderTabContent () {
    let result;
    var currentTab = Fonts.tabs[this.state.tab];

    if (this.state.tab !== Fonts.tabs.length - 1) { // Font library
      const lib = currentTab.lib;
      const input = this.state.data.input[lib];

      result = (
        <div>
          <h2 className='option_label'>{currentTab.label}</h2>
          <Input state={input.valid ? 'valid' : 'invalid'} value={input.input} onChange={this.changedInput.bind(this)} className='block' />
        </div>
      );
    } else { // Custom fonts
      result = (
        <CustomFonts
          submitCustomFont={this.onCustomSubmit.bind(this)}
          customFonts={this.state.data.customFonts}
          previewText={this.state.data.previewText}
          removeCustomFont={this.removeCustomFont.bind(this)} />
      );
    }

    return result;
  }

  renderTabButton (tabButton, a) {
    let isValid = this.state.data.input[tabButton.lib].valid;

    if (tabButton.lib === 'custom') {
      isValid = this.state.data.customFonts && this.state.data.customFonts.length > 0;
    }

    return (
      <a
        href='#'
        className={cx('fp-tab', this.state.tab === a && 'active', isValid && 'validated')}
        onClick={this.changeTab.bind(this, a)}
        key={a}
      >
        <span className={tabButton.icon}></span>
        <span>{tabButton.title}</span>
      </a>
    );
  }
}
