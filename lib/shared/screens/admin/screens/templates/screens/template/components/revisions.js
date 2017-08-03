import Component from 'components/component';
import Revisions from 'components/content-page-revisions';
import React from 'react';
import PropTypes from 'prop-types';
import {restoreRevision} from 'actions/revision';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({restoreRevision}, dispatch),
  (props) => ({
    fragments: {
      revisions: Revisions.fragments.revisions,
      template: Revisions.fragments.current
    },
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
