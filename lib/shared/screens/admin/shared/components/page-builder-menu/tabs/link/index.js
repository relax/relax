import * as pbActions from 'actions/page-builder';
import Component from 'components/component';
import bind from 'decorators/bind';
import elements from 'elements';
import getLinksPropertiesMap from 'helpers/page-builder/get-links-properties-map';
import isContextEqual from 'helpers/page-builder/is-context-equal';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import LinkingData from './linking-data';

@dataConnect(
  (state) => {
    const {linkingData, linkingDataElement, linkTabSchemaId} = state.pageBuilder;
    let schemaId;

    const options = {
      goal: 'read',
      extraLinks: []
    };

    const elementOptions = linkingDataElement && elements[linkingDataElement.tag].settings.dynamicLinkableOptions;
    if (elementOptions) {
      Object.assign(options, elementOptions);
    }

    if (linkingDataElement) {
      schemaId = linkingDataElement.props && linkingDataElement.props.schemaId;
    } else {
      schemaId = linkTabSchemaId;
    }

    const map = {
      linkingData,
      linkingDataElement,
      context: linkingData ? linkingData.context : {doc: 'draft', property: 'data'},
      schemaId,
      ...options
    };

    let links = {};
    if (linkingData) {
      links = linkingDataElement && linkingDataElement.props && linkingDataElement.props.schemaLinks || {};
    } else {
      const doc = state.pageBuilder.fragments.draft.doc;
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
    const result = {
      fragments: {},
      initialVariables: {},
      variablesTypes: {}
    };

    // schemas
    if (!props.schemas) {
      result.fragments.schemas = LinkingData.fragments.schemas;
      result.initialVariables.schemas = {
        filters: [{
          property: props.goal === 'write' ? 'publicWritable' : 'publicReadable',
          op: {
            eq: true
          }
        }]
      };
      result.variablesTypes.schemas = {
        filters: '[Filter]'
      };
    }

    // schema
    if (schemaId && schemaId !== 'page') {
      result.fragments.schema = LinkingData.fragments.schema;
      result.initialVariables.schema = {
        id: schemaId
      };
      result.variablesTypes.schema = {
        id: 'ID!'
      };
    }

    return result;
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
    context: PropTypes.object,
    goal: PropTypes.string.isRequired,
    extraLinks: PropTypes.array.isRequired
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
    const {linkingData, schemaId, pageBuilderActions, context, goal} = this.props;

    const state = this.context.store.getState();
    const {overed} = state.pageBuilder;

    if (overed && isContextEqual(context, overed.context)) {
      if (linkingData) {
        // data linkable element
        pageBuilderActions.addLink({
          elementId: linkingData.id,
          context,
          linkElementId: overed.id,
          property,
          prefix,
          goal
        });
      } else {
        // template
        pageBuilderActions.addLink({
          schemaId,
          context,
          linkElementId: overed.id,
          property,
          prefix,
          goal
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
      context,
      goal,
      extraLinks
    } = this.props;

    return (
      <LinkingData
        {...this.state}
        schemas={schemas}
        schema={schema}
        schemaId={schemaId}
        links={links}
        context={context}
        goal={goal}
        extraLinks={extraLinks}
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
