import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import Templates from './components';

@dataConnect(
  () => ({
    fragments: {
      templatesCount: true
    },
    mutations: {
      addTemplate: [{
        type: 'INCREMENT',
        field: 'templatesCount'
      }],
      removeTemplate: [{
        type: 'DECREMENT',
        field: 'templatesCount'
      }]
    }
  })
)
export default class TemplatesContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    templatesCount: PropTypes.number
  };

  render () {
    const {templatesCount} = this.props;
    return (
      <Templates count={templatesCount}>
        {this.props.children}
      </Templates>
    );
  }
}
