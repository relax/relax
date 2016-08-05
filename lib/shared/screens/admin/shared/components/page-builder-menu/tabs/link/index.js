import * as pbActions from 'actions/page-builder';

import bind from 'decorators/bind';
import getLinksPropertiesMap from 'helpers/get-links-properties-map';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  (state) => {
    const {linkingData, linkingDataElement, doc, linkTabSchemaId} = state.pageBuilder;
    let schemaId;

    if (linkingDataElement) {
      schemaId = linkingDataElement.props && linkingDataElement.props.schemaId;
    } else {
      schemaId = linkTabSchemaId;
    }

    const map = {
      linkingData,
      linkingDataElement,
      context: linkingData ? linkingData.context : 'data',
      schemaId
    };

    let links = {};
    if (linkingData) {
      links = linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaLinks || {};
    } else {
      links = doc.links && doc.links[schemaId] || {};
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
    schema: PropTypes.object,
    pageBuilderActions: PropTypes.object.isRequired,
    relate: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    linkingData: PropTypes.object,
    context: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    const {schemaId} = this.props;

    return {
      section: schemaId ? 'linking' : 'list' // list || linking
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
    const {linkingData, pageBuilderActions} = this.props;

    if (linkingData) {
      pageBuilderActions.changeElementProperty(
        linkingData.id,
        'schemaId',
        schemaId,
        linkingData.context
      );
    } else {
      pageBuilderActions.changeLinkTabSchemaId(schemaId);
    }

    this.setState({
      section: 'linking'
    });
  }

  @bind
  addSchemaLink ({property, prefix}) {
    const {linkingData, schemaId, pageBuilderActions, context} = this.props;

    const state = this.context.store.getState();
    const {overed} = state.pageBuilder;

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
  changeLinkAction ({linkElementId, index, value}) {
    const {linkingData, schemaId, pageBuilderActions, context} = this.props;

    pageBuilderActions.changeLinkAction({
      elementId: linkingData && linkingData.id,
      context,
      schemaId,
      linkElementId,
      index,
      value
    });
  }

  @bind
  removeLink ({linkElementId, index}) {
    const {linkingData, schemaId, pageBuilderActions, context} = this.props;

    pageBuilderActions.removeLink({
      elementId: linkingData && linkingData.id,
      context,
      schemaId,
      linkElementId,
      index
    });
  }

  @bind
  overLink (link) {
    const {pageBuilderActions, context} = this.props;
    pageBuilderActions.overElement(
      link.elementId,
      context
    );
  }

  @bind
  outLink (link) {
    const {pageBuilderActions, context} = this.props;
    pageBuilderActions.outElement(
      link.elementId,
      context
    );
  }

  render () {
    const {
      schema,
      schemaId,
      schemas,
      links,
      context
    } = this.props;

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
