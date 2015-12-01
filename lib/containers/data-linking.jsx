import * as adminActions from '../client/actions/admin';

import find from 'lodash.find';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import DataLinking from '../components/page-builder/menu/data-linking';

@connect(
  (state) => ({
    schemas: state.schemas.data.items,
    schema: state.schema.data
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class StylePickerContainer extends Component {
  static fragments = DataLinking.fragments

  static propTypes = {
    schemas: PropTypes.array.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  getInitState () {
    const {linkingDataElement} = this.props.pageBuilder;
    this.fetchCurrentSchema(this.props);
    return {
      list: linkingDataElement.props && linkingDataElement.props.schemaId ? false : true
    };
  }

  componentWillReceiveProps (nextProps) {
    const oldLinkingDataElement = this.props.pageBuilder.linkingDataElement;
    const {linkingDataElement} = nextProps.pageBuilder;

    if (oldLinkingDataElement && linkingDataElement) {
      if (!oldLinkingDataElement.props && linkingDataElement.props ||
          (oldLinkingDataElement.props && linkingDataElement.props && oldLinkingDataElement.props.schemaId !== linkingDataElement.props.schemaId)) {
        this.fetchCurrentSchema(nextProps);
      }
    }
  }

  fetchCurrentSchema (props) {
    const {linkingDataElement} = props.pageBuilder;

    if (linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaId) {
      const vars = {
        schema: {
          _id: {
            value: linkingDataElement.props.schemaId,
            type: 'ID!'
          }
        }
      };

      props
        .getAdmin(buildQueryAndVariables(
          this.constructor.fragments,
          vars
        ))
        .done();
    }
  }

  toggleList () {
    this.setState({
      list: !this.state.list
    });
  }

  changeSchema (schemaId) {
    const {changeElementProperty} = this.props.pageBuilderActions;
    const {linkingDataElementId} = this.props.pageBuilder;
    changeElementProperty(linkingDataElementId, 'schemaId', schemaId);
    this.setState({
      list: false
    });
  }

  render () {
    const {linkingDataElement} = this.props.pageBuilder;
    let selectedSchema = null;
    if (linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaId) {
      selectedSchema = find(this.props.schemas, {_id: linkingDataElement.props.schemaId});
    }

    return (
      <DataLinking
        {...this.props}
        {...this.state}
        selectedSchema={selectedSchema}
        toggleList={::this.toggleList}
        changeSchema={::this.changeSchema}
      />
    );
  }
}
