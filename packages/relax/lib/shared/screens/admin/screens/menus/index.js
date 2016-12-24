import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Content from './components/content.jsx';

@dataConnect(
  () => ({
    fragments: {
      menusCount: true
    },
    mutations: {
      addMenu: [{
        type: 'INCREMENT',
        field: 'menusCount'
      }],
      removeMenu: [{
        type: 'DECREMENT',
        field: 'menusCount'
      }]
    }
  })
)
export default class MenusContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    menusCount: PropTypes.number
  };

  render () {
    const {menusCount} = this.props;
    return (
      <Content count={menusCount}>
        {this.props.children}
      </Content>
    );
  }
}
