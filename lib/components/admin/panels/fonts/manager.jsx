import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import CustomFonts from './custom-fonts';
import Input from '../../../data-types/input';

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

export default class Manager extends Component {
  static propTypes = {
    fonts: PropTypes.object.isRequired,
    changeFontInputAndUpdate: PropTypes.func.isRequired,
    submitCustomFont: PropTypes.func.isRequired,
    removeCustomFont: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      tab: 0
    };
  }

  changeTab (tab, event) {
    event.preventDefault();
    this.setState({tab});
  }

  render () {
    return (
      <div className='fonts-manager'>
        <div className='fp-menu'>
          {tabs.map(this.renderTabButton.bind(this))}
        </div>
        <div className='fp-options'>
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  renderTabContent () {
    let result;
    const Tab = tabs[this.state.tab];

    if (this.state.tab !== tabs.length - 1) {
      // Font library
      const lib = Tab.lib;
      const input = this.props.fonts.input[lib];

      result = (
        <div>
          <h2 className='option_label'>{Tab.label}</h2>
          <Input state={input.valid ? 'valid' : 'invalid'} value={input.input} onChange={this.props.changeFontInputAndUpdate.bind(this, this.state.tab)} className='block' />
        </div>
      );
    } else {
      // Custom fonts
      result = (
        <CustomFonts
          customFonts={this.props.fonts.customFonts}
          previewText={this.props.fonts.previewText}
          submitCustomFont={this.props.submitCustomFont}
          removeCustomFont={this.props.removeCustomFont}
        />
      );
    }

    return result;
  }

  renderTabButton (tabButton, a) {
    let isValid = this.props.fonts.input[tabButton.lib].valid;

    if (tabButton.lib === 'custom') {
      isValid = this.props.fonts.customFonts && this.props.fonts.customFonts.length > 0;
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
