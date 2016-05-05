import utils from 'helpers/utils';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {buildQueryAndVariables} from 'relax-fragments';

import settings from './settings';
import Component from '../component';
import Element from '../element';
import List from './list';

@connect(
  (state) => ({
    elements: state.elements,
    linkingData: state.pageBuilder.linkingData,
    linkingDataElementId: state.pageBuilder.linkingDataElementId
  })
)
export default class DynamicListContainer extends Component {
  static fragments = {
    schemaList: {
      _id: 1,
      title: 1,
      date: 1,
      publishedDate: 1,
      updatedDate: 1,
      slug: 1,
      state: 1,
      properties: 1
    }
  };

  static propTypes = {
    children: PropTypes.node,
    schemaId: PropTypes.string,
    dataLinking: PropTypes.object,
    limit: PropTypes.number,
    columns: PropTypes.number,
    renderChildren: PropTypes.func.isRequired,
    verticalGutter: PropTypes.number.isRequired,
    horizontalGutter: PropTypes.number.isRequired,
    getElementData: PropTypes.func.isRequired,
    elements: PropTypes.object.isRequired,
    schemaLinks: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  getInitState () {
    this.fetchData(this.props);
    return {};
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schemaId !== this.props.schemaId ||
        nextProps.dataLinking !== this.props.dataLinking ||
        nextProps.limit > this.props.limit) {
      this.fetchData(nextProps);
    }
  }

  fetchData (props) {
    if (props.schemaId) {
      props.getElementData(props.elementId, buildQueryAndVariables(
        this.constructor.fragments,
        {
          schemaList: {
            schemaId: {
              value: props.schemaId,
              type: 'ID!'
            },
            limit: {
              value: props.limit,
              type: 'Int'
            }
          }
        }
      ));
    }
  }

  render () {
    const props = {
      htmlTag: 'div',
      ...this.props.relax,
      settings
    };
    const {elements, relax} = this.props;

    const entries = elements[relax.element.id] && elements[relax.element.id].schemaList || [];
    const elementsLinks = utils.getElementsSchemaLinks(this.props.schemaLinks);

    return (
      <Element {...props}>
        <List {...this.props} entries={entries} elementsLinks={elementsLinks}>
          {this.props.children}
        </List>
      </Element>
    );
  }
}
