import * as schemaActions from 'actions/schema';

import Component from 'components/component';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Properties from './properties';

@connect(
  (state) => ({
    openedProperties: state.schema.openedProperties,
    properties: state.schema.data.properties,
    type: state.schema.data.type
  }),
  (dispatch) => bindActionCreators(schemaActions, dispatch)
)
export default class SchemasBuilderPropertiesContainer extends Component {
  render () {
    return (
      <Properties
        {...this.props}
      />
    );
  }
}
