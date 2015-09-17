import React from 'react';
import {Component} from 'relax-framework';
import PageBuilder from '../../page-builder';

import draftActions from '../../../client/actions/draft';
import draftsStore from '../../../client/stores/drafts';

export default class Page extends Component {
  getInitialState () {
    return {
      draft: this.context.draft
    };
  }

  getInitialModels () {
    this.currentDraftId = this.context.draft.id;
    return {
      draft: draftsStore.getModel(this.context.draft.id, {update: false})
    };
  }

  componentDidUpdate () {
    if (this.context.draft.id !== this.currentDraftId) {
      this.setModels(this.getInitialModels());
    }
  }

  onChange (attributes) {
    draftActions.updateModel(this.currentDraftId, attributes);
  }

  render () {
    return (
      <PageBuilder value={this.state.draft} onChange={this.onChange.bind(this)} />
    );
  }
}

Page.contextTypes = {
  draft: React.PropTypes.object.isRequired
};
