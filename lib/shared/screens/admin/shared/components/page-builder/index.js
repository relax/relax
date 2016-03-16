import * as pageBuilderActions from 'actions/page-builder';

import Component from 'components/component';
import React, {PropTypes} from 'react';
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
        _id: {
          _id: 1,
          _userId: 1
        },
        __v: 1,
        data: 1,
        actions: 1
      }
    },
    variablesTypes: {
      draft: {
        id: 'ID!'
      }
    },
    initialVariables: {
      draft: {
        id: props.params.id
      }
    }
  })
)
export default class PageBuilderContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.relate.setVariables({
        draft: {
          id: nextProps.params.id
        }
      });
    }
  }

  render () {
    return (
      <PageBuilder {...this.props} />
    );
  }
}
