import React, {PropTypes} from 'react';
import {Component, buildQueryAndVariables} from 'relax-framework';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Schemas from '../../components/admin/panels/schemas';
import queryProps from '../../decorators/query-props';
import * as schemasActions from '../../client/actions/schemas';

@connect(
  (state) => ({
    schemas: state.schemas.data.items,
    count: state.schemas.data.count
  }),
  (dispatch) => bindActionCreators(schemasActions, dispatch)
)
@queryProps({
  page: 1,
  limit: 10
})
export default class SchemasContainer extends Component {
  static fragments = Schemas.fragments

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

  static panelSettings = {
    activePanelType: 'schemas',
    breadcrumbs: [
      {
        label: 'Schemas'
      }
    ]
  }

  render () {
    return (
      <Schemas {...this.props} {...this.state} />
    );
  }
}
