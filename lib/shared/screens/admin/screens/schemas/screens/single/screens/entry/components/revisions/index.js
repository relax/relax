import Component from 'components/component';
import Revisions from 'components/content-page-revisions';
import React, {PropTypes} from 'react';
import {restoreRevision} from 'actions/revision';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId
  }),
  (dispatch) => bindActionCreators({restoreRevision}, dispatch),
  (props) => ({
    fragments: {
      revisions: Revisions.fragments.revisions,
      schemaEntry: Revisions.fragments.current
    },
    variablesTypes: {
      revisions: {
        id: 'ID!'
      },
      schemaEntry: {
        schemaId: 'ID!',
        id: 'ID!'
      }
    },
    initialVariables: {
      revisions: {
        id: props.entryId
      },
      schemaEntry: {
        schemaId: props.schemaId,
        id: props.entryId
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
    schemaId: PropTypes.string.isRequired,
    entryId: PropTypes.string.isRequired,
    revisions: PropTypes.array,
    restoreRevision: PropTypes.func.isRequired,
    schemaEntry: PropTypes.object
  };

  render () {
    const {revisions, schemaEntry} = this.props;

    return (
      <Revisions
        revisions={revisions}
        current={schemaEntry}
        restore={this.props.restoreRevision}
      />
    );
  }
}
