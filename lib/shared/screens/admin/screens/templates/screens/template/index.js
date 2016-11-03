import * as templateActions from 'actions/template';
import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

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
            _id: 1,
            title: 1
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
    updateTemplateTitle: PropTypes.func.isRequired,
    removeTemplate: PropTypes.func.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.templateId !== nextProps.templateId && nextProps.templateId) {
      this.props.relate.setVariables({
        template: {
          id: nextProps.templateId
        }
      });
    }
  }

  render () {
    const {
      template,
      templateId,
      loading,
      updateTemplateTitle,
      removeTemplate
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={templateId}
        loading={loading}
        title={template && template.title}
        updateTitle={updateTemplateTitle}
        onRemove={removeTemplate}
        Revisions={Revisions}
        type='template'
      />
    );
  }
}
