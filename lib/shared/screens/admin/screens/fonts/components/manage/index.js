import Component from 'components/component';
import React from 'react';

import Manage from './manage';

const tabs = [
  {
    title: 'Google Fonts',
    lib: 'google',
    placeholder: 'Google Fonts Link'
  },
  {
    title: 'Typekit',
    lib: 'typekit',
    placeholder: 'Typekit kit id'
  },
  {
    title: 'Fonts.com',
    lib: 'monotype',
    placeholder: 'Fonts.com project id'
  },
  {
    title: 'Font Deck',
    lib: 'fontdeck',
    placeholder: 'Fontdeck project id'
  },
  {
    title: 'Custom Fonts',
    lib: 'custom'
  }
];

export default class ManageContainer extends Component {
  getInitState () {
    return {
      tab: 0
    };
  }

  changeTab (tab) {
    this.setState({
      tab
    });
  }

  render () {
    return (
      <Manage
        {...this.props}
        {...this.state}
        tabs={tabs}
        changeTab={::this.changeTab}
      />
    );
  }
}
