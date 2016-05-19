import Component from 'components/component';
import Revisions from 'components/content-page-revisions';
import React, {PropTypes} from 'react';
import {restoreRevision} from 'actions/revision';
import {bindActionCreators} from 'redux';
import {dataConnect, mergeFragments} from 'relate-js';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({restoreRevision}, dispatch),
  (props) => ({
    fragments: mergeFragments(
      Revisions.fragments,
      {
        template: {
          _id: 1,
          updatedDate: 1,
          updatedBy: {
            _id: 1,
            name: 1,
            email: 1
          }
        }
      }
    ),
    variablesTypes: {
      revisions: {
        id: 'ID!'
      },
      template: {
        id: 'ID!'
      }
    },
    initialVariables: {
      revisions: {
        id: props.templateId
      },
      template: {
        id: props.templateId
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
    templateId: PropTypes.string.isRequired,
    revisions: PropTypes.array,
    restoreRevision: PropTypes.func.isRequired
  };

  render () {
    const {revisions, template} = this.props;
    return (
      <Revisions
        revisions={revisions}
        current={template}
        restore={this.props.restoreRevision}
      />
    );
  }
}
