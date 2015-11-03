import * as overlaysActions from '../../client/actions/overlays';
import * as revisionsActions from '../../client/actions/revisions';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Overlay from '../../components/overlay';
import RevisionsOverlay from '../../components/admin/revisions-overlay';

@connect(
  (state) => ({
    revisions: state.revisions.data,
    errors: state.revisions.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(revisionsActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class RevisionsContainer extends Component {
  static fragments = RevisionsOverlay.fragments

  static propTypes = {
    revisions: PropTypes.array,
    getRevisions: PropTypes.func.isRequired,
    onRestore: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  componentWillMount () {
    this.props.getRevisions(this.constructor.fragments, this.props.id);
  }

  onClose () {
    this.props.closeOverlay('revisions');
  }

  onRestore (__v) {
    this.props.closeOverlay('revisions');
    this.props.onRestore(__v);
  }

  render () {
    return (
      <Overlay onClose={::this.onClose}>
        <RevisionsOverlay
          current={this.props.current}
          revisions={this.props.revisions}
          onRestorePage={::this.onRestore}
        />
      </Overlay>
    );
  }
}
