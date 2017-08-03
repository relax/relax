import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React from 'react';
import PropTypes from 'prop-types';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as templateActions from 'actions/template';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(templateActions, dispatch),
  (props) => {
    if (props.templateId) {
      return {
        fragments: {
          template: {
            _id: 1
          }
        },
        variablesTypes: {
          template: {
            id: 'ID!'
          }
        },
        initialVariables: {
          template: {
            id: props.templateId
          }
        }
      };
    }

    return {};
  }
)
export default class TemplateContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    template: PropTypes.object,
    templateId: PropTypes.string.isRequired,
    removeTemplate: PropTypes.func.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.templateId !== nextProps.templateId && nextProps.templateId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {
      template,
      templateId,
      loading,
      removeTemplate
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={templateId}
        notFound={!!(!loading && !template)}
        onRemove={removeTemplate}
        Revisions={Revisions}
        type='template'
      />
    );
  }
}
