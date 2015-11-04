import * as schemaListActions from '../../client/actions/schema-list';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import SchemaList from '../../components/admin/panels/schema-list';

@connect(
  (state) => ({
    schema: state.schema.data,
    schemaList: state.schemaList.data.items,
    count: state.schemaList.data.count
  }),
  (dispatch) => bindActionCreators(schemaListActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10,
  sort: '_id',
  order: 'desc'
})
export default class SchemaListContainer extends Component {
  static fragments = SchemaList.fragments

  static panelSettings = {
    activePanelType: 'schemaList',
    breadcrumbs: [
      {
        label: 'Schemas',
        type: 'schemas',
        link: '/admin/schemas'
      }
    ]
  }

  static propTypes = {
    hasQueryChanged: PropTypes.bool.isRequired,
    queryVariables: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasQueryChanged) {
      const vars = {
        schemaList: {
          schemaId: {
            value: nextProps.params.id,
            type: 'ID!'
          },
          ...nextProps.queryVariables
        },
        schemaListCount: {
          schemaId: {
            value: nextProps.params.id,
            type: 'ID!'
          }
        }
      };

      nextProps
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  render () {
    return (
      <SchemaList {...this.props} {...this.state} />
    );
  }
}
