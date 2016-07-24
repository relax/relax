import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  (props) => {
    const {schemaId} = props;
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
export default class PageBuilderLinkingDataContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string,
    schemas: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired,
    relate: PropTypes.object.isRequired,
    changeSchema: PropTypes.func.isRequired,
    links: PropTypes.array.isRequired
  };

  getInitState () {
    return {
      section: 'list' // list || linking
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.schemaId !== nextProps.schemaId) {
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
    const {changeSchema} = this.props;
    changeSchema(schemaId);
    this.setState({
      section: 'linking'
    });
  }

  render () {
    const {
      schema,
      schemas,
      pageBuilderActions,
      links
    } = this.props;

    return (
      <LinkingData
        {...this.state}
        schemas={schemas}
        schema={schema}
        toggleSection={this.toggleSection}
        pageBuilderActions={pageBuilderActions}
        changeSchema={this.changeSchema}
        links={links}
      />
    );
  }
}
