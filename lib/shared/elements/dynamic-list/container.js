import Component from 'components/component';
import isElementSelected from 'helpers/page-builder/is-element-selected';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';

import DynamicList from './dynamic-list';

@dataConnect(
  (state, props) => ({
    isLinkingData: state.pageBuilder && isElementSelected(state.pageBuilder.linkingData, {
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
          slug: 1,
          schemaSlug: 1,
          title: 1,
          date: 1,
          publishedDate: 1,
          updatedDate: 1,
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
    renderChildren: PropTypes.func.isRequired,
    Element: PropTypes.func.isRequired,
    relax: PropTypes.object.isRequired,
    schemaId: PropTypes.string,
    isLinkingData: PropTypes.bool,
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
      schemaLinks,
      Element,
      renderChildren
    } = this.props;

    return (
      <DynamicList
        entries={schemaList || []}
        relax={relax}
        Element={Element}
        renderChildren={renderChildren}
        elementsLinks={schemaLinks}
        limit={limit}
        columns={columns}
        verticalGutter={verticalGutter}
        horizontalGutter={horizontalGutter}
        isLinkingData={isLinkingData}
      />
    );
  }
}
