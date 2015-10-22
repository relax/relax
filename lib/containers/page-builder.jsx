import * as draftActions from '../client/actions/draft';
import * as pageBuilderActions from '../client/actions/page-builder';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import elements from '../components/elements';
import PageBuilder from '../components/page-builder';

@connect(
  (state) => ({
    draft: state.draft.data,
    pageBuilder: {...state.pageBuilder, elements}
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    draftActions: bindActionCreators(draftActions, dispatch)
  })
)
export default class PageBuilderContainer extends Component {
  static fragments = {
    draft: {
      actions: 1,
      data: 1,
      __v: 1
    }
  }

  static propTypes = {
    draft: PropTypes.object,
    pageBuilder: PropTypes.object,
    pageBuilderActions: PropTypes.object,
    draftActions: PropTypes.object
  }

  render () {
    return (
      <PageBuilder
        data={this.props.draft.data}
        actions={this.props.draft.actions}
        pageBuilder={this.props.pageBuilder}
        pageBuilderActions={this.props.pageBuilderActions}
      />
    );
  }
}
