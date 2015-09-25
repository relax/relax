import React from 'react';
import {Component} from 'relax-framework';
import PageBuilder from '../../page-builder';
import Styles from '../../../styles';
import Colors from '../../../colors';

import draftActions from '../../../client/actions/draft';
import draftsStore from '../../../client/stores/drafts';

export default class Page extends Component {
  getInitialState () {
    Colors.init(this.context.colors || []);
    Styles.init(this.context.styles || []);
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
    draftActions.updateModel(attributes);
  }

  render () {
    return (
      <PageBuilder value={this.state.draft} onChange={this.onChange.bind(this)} />
    );
  }
}

Page.contextTypes = {
  draft: React.PropTypes.object.isRequired,
  styles: React.PropTypes.array,
  colors: React.PropTypes.array
};
