import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updateSchemaEntryTitle, updateSchemaEntrySlug, updateSchemaEntryTemplate} from 'actions/schema-entry';
import {addTab} from 'actions/tabs';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import SchemaEntry from './components';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({
    updateSchemaEntryTitle,
    updateSchemaEntrySlug,
    updateSchemaEntryTemplate,
    addTab
  }, dispatch),
  (props) => ({
    fragments: SchemaEntry.fragments,
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

  getInitState () {
    this.processTab(this.props);
    return {
      sidebar: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.entryId !== nextProps.entryId && nextProps.entryId) {
      this.setState({
        sidebar: null
      });
      this.props.relate.refresh(nextProps);
    }

    const oldBuild = this.props.location.query.build;
    const currentBuild = nextProps.location.query.build;
    if (oldBuild !== currentBuild || this.props.entryId !== nextProps.entryId) {
      this.processTab(nextProps);
    }
  }

  processTab (props) {
    const currentBuild = props.location.query.build;
    if (currentBuild) {
      this.props.addTab(props.schemaId, props.entryId);
    }
  }

  @bind
  updateTitle (title) {
    const {schemaEntry, schemaId} = this.props;
    return this.props.updateSchemaEntryTitle(schemaId, schemaEntry._id, title);
  }

  @bind
  updateSlug (slug) {
    const {schemaEntry, schemaId} = this.props;
    return this.props.updateSchemaEntrySlug(schemaId, schemaEntry._id, slug);
  }

  @bind
  updateTemplate (temlateId) {
    const {schemaEntry, schemaId} = this.props;
    return this.props.updateSchemaEntryTemplate(schemaId, schemaEntry._id, temlateId);
  }

  @bind
  toggleInfo () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'info' ? null : 'info'
    });
  }

  @bind
  toggleRevisions () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'revisions' ? null : 'revisions'
    });
  }

  @bind
  toggleTemplates () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'templates' ? null : 'templates'
    });
  }

  render () {
    const {schemaEntry, schema, location, loading, entryId, schemaId} = this.props;

    return (
      <SchemaEntry
        {...this.state}
        schemaEntry={schemaEntry}
        schema={schema}
        entryId={entryId}
        schemaId={schemaId}
        location={location}
        loading={loading}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        updateTemplate={this.updateTemplate}
        toggleInfo={this.toggleInfo}
        toggleRevisions={this.toggleRevisions}
        toggleTemplates={this.toggleTemplates}
      />
    );
  }
}
