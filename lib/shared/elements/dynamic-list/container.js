import isElementSelected from 'helpers/is-element-selected';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Component from '../component';
import DynamicList from './dynamic-list';

@dataConnect(
  (state, props) => ({
    isLinkingData: isElementSelected(state.pageBuilder.linkingData, {
      id: props.relax.element.id,
      context: props.relax.context
    })
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
    isLinkingData: PropTypes.bool,
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
      isLinkingData,
      schemaList,
      schemaLinks
    } = this.props;

    return (
      <DynamicList
        entries={schemaList || []}
        relax={relax}
        elementsLinks={schemaLinks}
        limit={limit}
        columns={columns}
        verticalGutter={verticalGutter}
        horizontalGutter={horizontalGutter}
        isLinkingData={isLinkingData}
      >
        {this.props.children}
      </DynamicList>
    );
  }
}
