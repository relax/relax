import Component from 'components/component';
import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {openDropDraftConfirmation, openPushChangesConfirmation} from 'actions/page-builder';

import Actions from './actions';

@connect(
  (state) => {
    const fragment = get(state.pageBuilder, ['fragments', 'draft'], {});

    return {
      draftHasChanges: (fragment.actions && fragment.actions.length > 0) || state.pageBuilder.restored,
      isPublished: !!(get(fragment, ['doc', 'status'], 'draft') === 'published')
    };
  },
  (dispatch) => bindActionCreators({
    openDropDraftConfirmation,
    openPushChangesConfirmation
  }, dispatch)
)
export default class ActionsContainer extends Component {
  static propTypes = {
    openDropDraftConfirmation: PropTypes.func.isRequired,
    openPushChangesConfirmation: PropTypes.func.isRequired,
    draftHasChanges: PropTypes.bool.isRequired,
    isPublished: PropTypes.bool.isRequired
  };

  render () {
    const {draftHasChanges, isPublished} = this.props;

    return (
      <Actions
        draftHasChanges={draftHasChanges}
        isPublished={isPublished}
        openDropDraftConfirmation={this.props.openDropDraftConfirmation}
        openPushChangesConfirmation={this.props.openPushChangesConfirmation}
      />
    );
  }
}
