import Component from 'components/component';
import Viewer from 'components/viewer';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    schemaSlug: state.router.params.schemaSlug,
    schemaEntrySlug: state.router.params.slug
  }),
  (props) => ({
    fragments: {
      schema: {
        _id: 1,
        template: {
          _id: 1,
          data: 1,
          links: 1
        }
      },
      schemaEntry: {
        _id: 1,
        title: 1,
        data: 1,
        schemaId: 1,
        properties: 1,
        template: {
          _id: 1,
          data: 1,
          links: 1
        }
      }
    },
    variablesTypes: {
      schema: {
        slug: 'String'
      },
      schemaEntry: {
        schemaSlug: 'String',
        schemaEntrySlug: 'String',
        state: 'String',
        public: 'Boolean'
      }
    },
    initialVariables: {
      schema: {
        slug: props.schemaSlug
      },
      schemaEntry: {
        schemaSlug: props.schemaSlug,
        schemaEntrySlug: props.schemaEntrySlug,
        state: 'published',
        public: true
      }
    }
  })
)
export default class SchemaEntryContainer extends Component {
  static propTypes = {
    schemaSlug: PropTypes.string,
    schemaEntrySlug: PropTypes.string
  };

  render () {
    const {schemaEntry, schema} = this.props;
    let template;
    const isSchemaEntry = !!(schemaEntry && schemaEntry.schemaId);

    if (isSchemaEntry) {
      template = schemaEntry && schemaEntry.template || schema && schema.template;
    } else {
      template = schemaEntry && schemaEntry.template;
    }

    return (
      <Viewer
        doc={schemaEntry}
        template={template}
        type={schema && schema._id}
      />
    );
  }
}
