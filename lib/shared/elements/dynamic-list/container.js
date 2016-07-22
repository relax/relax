import utils from 'helpers/utils';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Component from '../component';
import DynamicList from './dynamic-list';

@dataConnect(
  (state) => ({
    linkingData: state.pageBuilder.linkingData,
    linkingDataElementId: state.pageBuilder.linkingDataElementId
  }),
  (props) => {
    const result = {
      variablesTypes: {
        schemaList: {
          schemaId: 'ID!',
          limit: 'Int'
        }
      }
    };

    if (props.schemaId) {
      result.fragments = {
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
      result.initialVariables = {
        schemaList: {
          schemaId: props.schemaId,
          limit: props.limit
        }
      };
    }

    return result;
  }
)
export default class DynamicListContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string,
    children: PropTypes.node,
    linkingData: PropTypes.bool,
    linkingDataElementId: PropTypes.string,
    relax: PropTypes.object.isRequired,
    limit: PropTypes.number,
    columns: PropTypes.number,
    verticalGutter: PropTypes.string,
    horizontalGutter: PropTypes.string,
    elementsLinks: PropTypes.object,
    schemaList: PropTypes.array
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.schemaId !== nextProps.schemaId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {
      relax,
      limit,
      columns,
      verticalGutter,
      horizontalGutter,
      linkingData,
      linkingDataElementId,
      schemaList,
      schemaLinks
    } = this.props;

    const elementsLinks = utils.getElementsSchemaLinks(schemaLinks);

    return (
      <DynamicList
        entries={schemaList || []}
        relax={relax}
        elementsLinks={elementsLinks}
        limit={limit}
        columns={columns}
        verticalGutter={verticalGutter}
        horizontalGutter={horizontalGutter}
        linkingData={linkingData}
        linkingDataElementId={linkingDataElementId}
      >
        {this.props.children}
      </DynamicList>
    );
  }
}
