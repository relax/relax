import Component from 'components/component';
import Revisions from 'components/content-page-revisions';
import React, {PropTypes} from 'react';
import {restoreRevision} from 'actions/revision';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({restoreRevision}, dispatch),
  (props) => ({
    fragments: {
      revisions: Revisions.fragments.revisions,
      page: Revisions.fragments.current
    },
    variablesTypes: {
      revisions: {
        id: 'ID!'
      },
      page: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      revisions: {
        id: props.pageId
      },
      page: {
        _id: props.pageId
      }
    },
    mutations: {
      restoreRevision: [{
        type: 'PREPEND',
        field: 'revisions',
        select: 'revision'
      }]
    }
  })
)
export default class PageRevisionsContainer extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    revisions: PropTypes.array,
    restoreRevision: PropTypes.func.isRequired
  };

  render () {
    const {revisions, page} = this.props;
    return (
      <Revisions
        revisions={revisions}
        current={page}
        restore={this.props.restoreRevision}
      />
    );
  }
}
