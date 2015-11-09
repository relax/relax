import * as schemasActions from '../../client/actions/schemas';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import queryProps from '../../decorators/query-props';
import Schemas from '../../components/admin/panels/schemas';

@connect(
  (state) => ({
    schemas: state.schemas.data.items,
    count: state.schemas.data.count
  }),
  (dispatch) => bindActionCreators(schemasActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10,
  sort: '_id',
  order: 'desc'
})
export default class SchemasContainer extends Component {
  static fragments = Schemas.fragments

  static panelSettings = {
    activePanelType: 'schemas',
    breadcrumbs: [
      {
        label: 'Schemas'
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
        schemas: {
          ...nextProps.queryVariables
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
      <Schemas {...this.props} {...this.state} />
    );
  }
}
