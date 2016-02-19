import * as pageBuilderActions from 'actions/page-builder';

import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageBuilder from './page-builder.jsx';

@dataConnect()
@connect(
  (state) => ({
    params: state.router.params,
    elementsMenuOpened: state.pageBuilder.elementsMenuOpened,
    dragging: state.dnd.dragging
  }),
  (dispatch) => ({
    pageBuilderActions: bindActionCreators(pageBuilderActions, dispatch)
  })
)
export default class PageBuilderContainer extends Component {
  static fragments = {
    draft: {
      _id: {
        _id: 1,
        _userId: 1
      },
      __v: 1,
      data: 1,
      actions: 1
    }
  };

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.getData(nextProps);
    }
  }

  initialize () {
    this.getData(this.props);
  }

  getData (props) {
    props.fetchData({
      fragments: PageBuilderContainer.fragments,
      variables: {
        draft: {
          id: {
            value: props.params.id,
            type: 'ID!'
          }
        }
      }
    });
  }

  render () {
    return (
      <PageBuilder {...this.props} />
    );
  }
}
