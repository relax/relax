import * as pbActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  (state) => ({
    linkingDataElementId: state.pageBuilder.linkingDataElementId,
    linkingDataElement: state.pageBuilder.linkingDataElement,
    elementSchemaLinks:
      state.pageBuilder.linkingDataElement &&
      state.pageBuilder.linkingDataElement.props &&
      state.pageBuilder.linkingDataElement.props.schemaLinks ||
      {}
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pbActions, dispatch)
  }),
  (props) => {
    const schemaId = props.linkingDataElement.props && props.linkingDataElement.props.schemaId;
    const fragments = {};

    // schemas
    if (!props.schemas) {
      fragments.schemas = LinkingData.fragments.schemas;
    }

    // schema
    if (schemaId) {
      fragments.schema = LinkingData.fragments.schema;
    }

    return {
      fragments,
      initialVariables: {
        schema: {
          id: schemaId
        }
      },
      variablesTypes: {
        schema: {
          id: 'ID!'
        }
      }
    };
  }
)
export default class LinkingDataContainer extends Component {
  static propTypes = {
    schemas: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired,
    linkingDataElementId: PropTypes.string.isRequired,
    linkingDataElement: PropTypes.object.isRequired,
    relate: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      section: 'list' // list || linking
    };
  }

  componentWillReceiveProps (nextProps) {
    const previousSchemaId = this.props.linkingDataElement.props && this.props.linkingDataElement.props.schemaId;
    const nextSchemaId = nextProps.linkingDataElement.props && nextProps.linkingDataElement.props.schemaId;
    if (previousSchemaId !== nextSchemaId) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  toggleSection () {
    const {section} = this.state;
    this.setState({
      section: section === 'list' ? 'linking' : 'list'
    });
  }

  @bind
  changeSchema (schemaId) {
    const {pageBuilderActions, linkingDataElementId} = this.props;
    pageBuilderActions.changeElementProperty(
      linkingDataElementId,
      'schemaId',
      schemaId
    );
    this.setState({
      section: 'linking'
    });
  }

  render () {
    const {
      schema,
      schemas,
      pageBuilderActions,
      elementSchemaLinks
    } = this.props;

    return (
      <LinkingData
        {...this.state}
        schemas={schemas}
        schema={schema}
        toggleSection={this.toggleSection}
        pageBuilderActions={pageBuilderActions}
        changeSchema={this.changeSchema}
        elementSchemaLinks={elementSchemaLinks}
      />
    );
  }
}
