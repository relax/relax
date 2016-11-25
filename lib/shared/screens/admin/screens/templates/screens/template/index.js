import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    templateId: state.router.params.id
  }),
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
