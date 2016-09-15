import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updateColors} from 'helpers/styles/colors';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import PageBuilder from './page-builder.jsx';

@dataConnect(
  (state) => ({
    params: state.router.params,
    elementsMenuOpened: state.pageBuilder.elementsMenuOpened,
    dragging: state.dnd.dragging
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  }),
  (props) => ({
    fragments: {
      draft: {
        _id: 1,
        __v: 1,
        itemId: 1,
        userId: 1,
        type: 1,
        doc: 1,
        actions: 1
      },
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
      draft: {
        id: 'ID!',
        type: 'String!'
      }
    },
    initialVariables: {
      draft: {
        id: props.itemId,
        type: props.type
      }
    }
  })
)
export default class PageBuilderContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    colors: PropTypes.array,
    pageBuilderActions: PropTypes.object.isRequired,
    template: PropTypes.object
  };

  static defaultProps = {
    type: 'page'
  };

  init () {
    const {colors, template} = this.props;

    updateColors(colors);

    // save template in reducer for usage in layers tab
    this.props.pageBuilderActions.setPageBuilderTemplate(template);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id && nextProps.params.id) {
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
