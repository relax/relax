import * as adminActions from '../client/actions/admin';

import find from 'lodash.find';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import FormDataLinking from '../components/page-builder/menu/form-data-linking';

@connect(
  (state) => ({
    schemas: state.schemas.data.items
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class FormDataLinkingContainer extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <FormDataLinking
        {...this.props}
      />
    );
  }
}
