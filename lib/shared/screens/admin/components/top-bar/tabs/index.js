import * as tabsActions from 'actions/tabs';

import bind from 'decorators/bind';
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

  getInitState () {
    return {
      newOpened: false
    };
  }

  @bind
  openNew () {
    this.setState({
      newOpened: true
    });
  }

  @bind
  closeNew () {
    this.setState({
      newOpened: false
    });
  }

  render () {
    const {tabs, removeTab, pathname} = this.props;
    return (
      <Tabs
        {...this.state}
        tabs={tabs}
        removeTab={removeTab}
        pathname={pathname}
        openNew={this.openNew}
        closeNew={this.closeNew}
      />
    );
  }
}
