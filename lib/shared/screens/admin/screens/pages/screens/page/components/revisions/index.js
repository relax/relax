import Component from 'components/component';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Revisions from './revisions';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (props) => ({
    fragments: Revisions.fragments,
    variablesTypes: {
      revisions: {
        id: 'ID!'
      }
    },
    initialVariables: {
      revisions: {
        id: props.pageId
      }
    }
  })
)
export default class PageRevisionsContainer extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    revisions: PropTypes.array
  };

  render () {
    const {revisions} = this.props;
    return (
      <Revisions revisions={revisions} />
    );
  }
}
