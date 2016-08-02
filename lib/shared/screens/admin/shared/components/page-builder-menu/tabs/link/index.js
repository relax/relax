import * as pbActions from 'actions/page-builder';

import bind from 'decorators/bind';
import Component from 'components/component';
import PageBuilderLink from 'components/page-builder-link';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

@connect(
  (state) => ({
    linkTabSchemaId: state.pageBuilder.linkTabSchemaId,
    linkingDataElementId: state.pageBuilder.linkingDataElementId,
    linkingDataElement: state.pageBuilder.linkingDataElement,
    elementSchemaLinks:
      state.pageBuilder.linkingDataElement &&
      state.pageBuilder.linkingDataElement.props &&
      state.pageBuilder.linkingDataElement.props.schemaLinks ||
      {}
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pbActions, dispatch)
  })
)
export default class LinkTab extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    linkingDataElementId: PropTypes.string,
    linkingDataElement: PropTypes.object,
    linkTabSchemaId: PropTypes.string
  };

  @bind
  changeSchema (schemaId) {
    const {pageBuilderActions, linkingDataElementId} = this.props;

    if (linkingDataElementId) {
      pageBuilderActions.changeElementProperty(
        linkingDataElementId,
        'schemaId',
        schemaId
      );
    } else {
      pageBuilderActions.changeLinkTabSchemaId(schemaId);
    }
  }

  render () {
    const {
      linkingDataElement,
      linkTabSchemaId
    } = this.props;

    return (
      <PageBuilderLink
        schemaId={
          linkingDataElement ?
          (linkingDataElement.props && linkingDataElement.props.schemaId) :
          linkTabSchemaId
        }
        changeSchema={this.changeSchema}
      />
    );
  }
}
