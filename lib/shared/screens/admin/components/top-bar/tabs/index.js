import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Tabs from './tabs';

@dataConnect()
@connect(
  (state) => ({
    tabs: state.tabs.data
  })
)
export default class TabsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: Tabs.fragments
    });
  }

  render () {
    const {tabs} = this.props;
    return (
      <Tabs tabs={tabs} />
    );
  }
}
