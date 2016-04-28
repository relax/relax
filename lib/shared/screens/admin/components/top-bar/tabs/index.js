import * as tabsActions from 'actions/tabs';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Tabs from './tabs';

@dataConnect(
  (state) => ({
    pathname: state.router.location.pathname
  }),
  (dispatch) => bindActionCreators(tabsActions, dispatch),
  () => ({
    fragments: Tabs.fragments,
    mutations: {
      addTab: [{
        type: 'APPEND',
        field: 'tabs'
      }]
    }
  })
)
export default class TabsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired,
    removeTab: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  };

  static defaultProps = {
    tabs: []
  };

  render () {
    const {tabs, removeTab, pathname} = this.props;
    return (
      <Tabs tabs={tabs} removeTab={removeTab} pathname={pathname} />
    );
  }
}
