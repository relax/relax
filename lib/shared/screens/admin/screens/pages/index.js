import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Pages from './components/pages.jsx';

@dataConnect(
  () => ({
    fragments: {
      pagesCount: true
    },
    mutations: {
      addPage: [{
        type: 'INCREMENT',
        field: 'pagesCount'
      }],
      removePage: [{
        type: 'DECREMENT',
        field: 'pagesCount'
      }]
    }
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    pagesCount: PropTypes.number
  };

  render () {
    const {pagesCount} = this.props;
    return (
      <Pages count={pagesCount}>
        {this.props.children}
      </Pages>
    );
  }
}
