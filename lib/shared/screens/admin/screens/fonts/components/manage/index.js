import * as fontsActions from 'actions/fonts';

import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

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

@dataConnect(
  (state) => ({
    tab: state.fonts.tab,
    saving: state.fonts.saving
  }),
  (dispatch) => bindActionCreators(fontsActions, dispatch),
  () => ({
    fragments: {
      settings: {
        _id: 1,
        value: 1
      }
    },
    variablesTypes: {
      settings: {
        ids: '[String]!'
      }
    },
    initialVariables: {
      settings: {
        ids: ['fonts']
      }
    }
  })
)
export default class ManageContainer extends Component {
  static propTypes = {
    tab: PropTypes.number.isRequired,
    changeFontsTab: PropTypes.func.isRequired,
    closeFontsManage: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
  };

  render () {
    const {tab, saving, changeFontsTab, closeFontsManage} = this.props;

    return (
      <Manage
        tab={tab}
        tabs={tabs}
        changeTab={changeFontsTab}
        closeManage={closeFontsManage}
        saving={saving}
      />
    );
  }
}
