import * as dndActions from '../client/actions/dnd';
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
    data: state.draft.data.data,
    actions: state.draft.data.actions,
    pageBuilder: {...state.pageBuilder, elements},
    dnd: state.dnd
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch),
    draftActions: bindActionCreators(draftActions, dispatch),
    dndActions: bindActionCreators(dndActions, dispatch)
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
    data: PropTypes.object,
    actions: PropTypes.object,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    draftActions: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  render () {
    return (
      <PageBuilder
        {...this.props}
      />
    );
  }
}
