import * as schemaEntryActions from 'actions/schema-entry';
import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import bind from 'decorators/bind';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId
  }),
  (dispatch) => bindActionCreators(schemaEntryActions, dispatch),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        template: ContentPageBuilder.fragments.template
      },
      schemaEntry: {
        _id: 1,
        title: 1,
        slug: 1,
        state: 1,
        template: ContentPageBuilder.fragments.template
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
    location: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.entryId !== nextProps.entryId && nextProps.entryId) {
      this.props.relate.refresh(nextProps);
    }
  }

  @bind
  updateTitle (entryId, title) {
    const {updateSchemaEntryTitle, schemaId} = this.props;
    return updateSchemaEntryTitle(schemaId, entryId, title);
  }

  @bind
  updateSlug (entryId, slug) {
    const {updateSchemaEntrySlug, schemaId} = this.props;
    return updateSchemaEntrySlug(schemaId, entryId, slug);
  }

  @bind
  updateTemplate (entryId, temlateId) {
    const {updateSchemaEntryTemplate, schemaId} = this.props;
    return updateSchemaEntryTemplate(schemaId, entryId, temlateId);
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
    const {schemaEntry, schema, loading, entryId, schemaId} = this.props;

    return (
      <ContentPageBuilder
        itemId={entryId}
        loading={loading}
        title={schemaEntry && schemaEntry.title}
        slug={schemaEntry && schemaEntry.slug}
        template={
          schemaEntry && schemaEntry.template ||
          schema && schema.template
        }
        state={schemaEntry && schemaEntry.state}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        updateTemplate={this.updateTemplate}
        onRemove={this.removeEntry}
        publish={this.publish}
        unpublish={this.unpublish}
        Revisions={Revisions}
        type={schemaId}
      />
    );
  }
}
