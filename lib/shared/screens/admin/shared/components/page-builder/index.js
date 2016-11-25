import * as pageBuilderActions from 'actions/page-builder';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';
import {updateColors} from 'helpers/styles/colors';

import PageBuilder from './page-builder.jsx';

@dataConnect(
  (state) => ({
    params: state.router.params,
    elementsMenuOpened: state.pageBuilder.elementsMenuOpened,
    dragging: state.dnd.dragging,
    currentItemId: state.pageBuilder.itemId,
    templateId: state.pageBuilder.doc && state.pageBuilder.doc.template,
    currentTemplateId: state.pageBuilder.template && state.pageBuilder.template._id
  }),
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
    if (this.props.template !== nextProps.template) {
      pageBuilderActions.setPageBuilderTemplate(nextProps.template);
    }
  }

  render () {
    return (
      <PageBuilder {...this.props} />
    );
  }
}
