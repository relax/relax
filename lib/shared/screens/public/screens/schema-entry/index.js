import Component from 'components/component';
import Viewer from 'components/viewer';
import React, {PropTypes} from 'react';
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
        schemaEntrySlug: 'String'
      }
    },
    initialVariables: {
      schema: {
        slug: props.schemaSlug
      },
      schemaEntry: {
        schemaSlug: props.schemaSlug,
        schemaEntrySlug: props.schemaEntrySlug
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

    return (
      <Viewer
        doc={schemaEntry}
        template={schema && schema.template || schemaEntry && schemaEntry.template}
        type={schema && schema._id}
      />
    );
  }
}
