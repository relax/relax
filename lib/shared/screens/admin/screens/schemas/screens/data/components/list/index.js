import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import List from './list';

@dataConnect(
  (props) => ({
    fragments: {}
  })
)
export default class DataSchemaListContainer extends Component {
  static fragments = List.fragments;

  static propTypes = {
    schema: PropTypes.object.isRequired
  };

  render () {
    return (
      <List />
    );
  }
}
