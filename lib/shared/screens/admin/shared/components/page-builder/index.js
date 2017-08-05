import * as pageBuilderActions from 'actions/page-builder';
import Component from 'components/component';
import getContextFragment from 'helpers/page-builder/get-context-fragment';
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {updateColors} from 'helpers/styles/colors';

import PageBuilder from './page-builder.jsx';

@dataConnect(
  (state, props) => {
    const pageBuilder = state.pageBuilder;
    const fragment = getContextFragment(pageBuilder, {doc: 'draft'});

    return {
      params: state.router.params,
      elementsMenuOpened: pageBuilder.elementsMenuOpened,
      dragging: state.dnd.dragging,
      currentItemId: pageBuilder.itemId,
      templateId: fragment.doc && fragment.doc.template || props.defaultTemplateId,
      currentTemplateId: pageBuilder.template && pageBuilder.template._id
    };
  },
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  }),
  (props) => {
    const result = {
      fragments: {
        colors: {
          _id: 1,
          label: 1,
          value: 1
        },
        styles: {
          _id: 1,
          title: 1,
          type: 1,
          options: 1,
          displayOptions: 1
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
      },
      mutations: {
        addColor: [{
          type: 'APPEND',
          field: 'colors'
        }]
      }
    };

    if (props.templateId && (!props.currentTemplateId || props.templateId !== props.currentTemplateId)) {
      result.fragments.template = {
        _id: 1,
        data: 1,
        links: 1
      };
    }

    return result;
  }
)
export default class PageBuilderContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    colors: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired,
    template: PropTypes.object,
    currentTemplateId: PropTypes.string
  };

  static defaultProps = {
    type: 'page'
  };

  componentWillMount () {
    const {colors, template} = this.props;

    updateColors(colors);

    // save template in reducer for usage in layers tab
    this.props.pageBuilderActions.setPageBuilderTemplate(template);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.templateId !== nextProps.templateId && nextProps.templateId) {
      this.props.relate.refresh(nextProps);
    }
    if (this.props.colors !== nextProps.colors) {
      updateColors(nextProps.colors);
    }
    if (this.props.template !== nextProps.template && nextProps.template) {
      nextProps.pageBuilderActions.setPageBuilderTemplate(nextProps.template);
    }
  }

  render () {
    return (
      <PageBuilder {...this.props} />
    );
  }
}
