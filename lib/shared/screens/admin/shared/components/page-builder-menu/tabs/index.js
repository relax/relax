import Component from 'components/component';
import React, {PropTypes} from 'react';
import {setMenuTab} from 'actions/page-builder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Tabs from './tabs';

@connect(
  (state) => ({
    menuTab: state.pageBuilder.menuTab,
    type: state.pageBuilder.type
  }),
  (dispatch) => bindActionCreators({setMenuTab}, dispatch)
)
export default class TabsContainer extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  render () {
    const {type} = this.props;

    return (
      <Tabs
        {...this.props}
        dataLinkable={type === 'template'}
      />
    );
  }
}
