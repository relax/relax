import * as pbActions from 'actions/page-builder';

import bind from 'decorators/bind';
import getLinksPropertiesMap from 'helpers/get-links-properties-map';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  (state, props) => {
    const map = {
      linkingData: state.pageBuilder.linkingData,
      linkingDataElement: state.pageBuilder.linkingDataElement
    };

    let links = {};
    if (map.linkingData) {
      const element = state.pageBuilder.linkingDataElement;
      links = element && element.props && element.props.schemaLinks || {};
    } else {
      const doc = state.pageBuilder.doc;
      links = doc.links && doc.links[props.schemaId] || {};
    }

    map.links = getLinksPropertiesMap(links);

    return map;
  },
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pbActions, dispatch)
  }),
  (props) => {
    const {schemaId} = props;
    const fragments = {};

    // schemas
    if (!props.schemas) {
      fragments.schemas = LinkingData.fragments.schemas;
    }

    // schema
    if (schemaId && schemaId !== 'page') {
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
    links: PropTypes.array.isRequired,
    linkingData: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
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

  @bind
  addSchemaLink ({property, prefix}) {
    const {linkingData, schemaId, pageBuilderActions} = this.props;

    const state = this.context.store.getState();
    const {overed} = state.pageBuilder;
    const context = linkingData ? linkingData.context : 'data';

    if (overed && context === overed.context) {
      if (linkingData) {
        // data linkable element
        pageBuilderActions.addLink({
          elementId: linkingData.id,
          context,
          linkElementId: overed.id,
          property,
          prefix
        });
      } else {
        // template
        pageBuilderActions.addLink({
          schemaId,
          context,
          linkElementId: overed.id,
          property,
          prefix
        });
      }
    }
  }

  @bind
  changeLinkAction () {

  }

  @bind
  removeLink () {

  }

  @bind
  overLink () {

  }

  @bind
  outLink () {

  }

  render () {
    const {
      schema,
      schemaId,
      schemas,
      links,
      linkingData
    } = this.props;
    const context = linkingData ? linkingData.context : 'data';

    return (
      <LinkingData
        {...this.state}
        schemas={schemas}
        schema={schema}
        schemaId={schemaId}
        links={links}
        context={context}
        toggleSection={this.toggleSection}
        changeSchema={this.changeSchema}
        addSchemaLink={this.addSchemaLink}
        changeLinkAction={this.changeLinkAction}
        removeLink={this.removeLink}
        overLink={this.overLink}
        outLink={this.outLink}
      />
    );
  }
}
