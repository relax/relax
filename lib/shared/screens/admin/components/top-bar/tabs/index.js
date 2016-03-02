import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Tabs from './tabs';

@dataConnect(
  () => ({
    fragments: Tabs.fragments
  })
)
export default class TabsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
  };

  static defaultProps = {
    tabs: []
  };

  render () {
    const {tabs} = this.props;
    return (
      <Tabs tabs={tabs} />
    );
  }
}
