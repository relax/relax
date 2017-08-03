import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import bind from 'decorators/bind';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import DataSchemaForm from 'components/data-form';
import Content from 'components/content';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId,
    formView: state.router.location.query.form === 'true'
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        template: {
          _id: 1
        }
      },
      schemaEntry: {
        _id: 1,
        state: 1
      }
    },
    variablesTypes: {
      schema: {
        id: 'ID!'
      },
      schemaEntry: {
        schemaId: 'ID!',
        id: 'ID!'
      }
    },
    initialVariables: {
      schema: {
        id: props.schemaId
      },
      schemaEntry: {
        schemaId: props.schemaId,
        id: props.entryId
      }
    }
  })
)
export default class SchemaEntryContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    schema: PropTypes.object,
    schemaEntry: PropTypes.object,
    schemaId: PropTypes.string.isRequired,
    entryId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    formView: PropTypes.bool.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.entryId !== nextProps.entryId && nextProps.entryId) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  removeEntry (entryId) {
    const {removeSchemaEntry, schemaId} = this.props;
    return removeSchemaEntry(schemaId, entryId, true, 'single');
  }

  @bind
  publish (entryId) {
    const {publishSchemaEntry, schemaId} = this.props;
    return publishSchemaEntry(schemaId, entryId);
  }

  @bind
  unpublish (entryId) {
    const {unpublishSchemaEntry, schemaId} = this.props;
    return unpublishSchemaEntry(schemaId, entryId);
  }

  render () {
    const {schemaEntry, loading, entryId, schemaId, schema} = this.props;

    return (
      <ContentPageBuilder
        itemId={entryId}
        state={schemaEntry && schemaEntry.state}
        notFound={!!(!loading && !schemaEntry)}
        defaultTemplateId={schema && schema.template && schema.template._id}
        onRemove={this.removeEntry}
        publish={this.publish}
        unpublish={this.unpublish}
        Revisions={Revisions}
        type={schemaId}
      >
        {this.renderContent()}
      </ContentPageBuilder>
    );
  }

  renderContent () {
    const {formView} = this.props;

    if (formView) {
      return (
        <Content noOffset>
          <DataSchemaForm />
        </Content>
      );
    }
  }
}
