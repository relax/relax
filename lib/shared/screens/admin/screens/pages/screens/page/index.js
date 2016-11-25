import * as pageActions from 'actions/page';
import Component from 'components/component';
import ContentPageBuilder from 'components/content-page-builder';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Revisions from './components/revisions';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (dispatch) => bindActionCreators(pageActions, dispatch),
  (props) => ({
    fragments: {
      page: {
        _id: 1,
        state: 1
      }
    },
    variablesTypes: {
      page: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      page: {
        _id: props.pageId
      }
    }
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    page: PropTypes.object,
    pageId: PropTypes.string.isRequired,
    removePage: PropTypes.func.isRequired,
    publishPage: PropTypes.func,
    unpublishPage: PropTypes.func
  };

  componentWillReceiveProps (nextProps) {
    if (this.props.pageId !== nextProps.pageId && nextProps.pageId) {
      this.props.relate.refresh(nextProps);
    }
  }

  render () {
    const {
      page,
      loading,
      pageId,
      removePage,
      publishPage,
      unpublishPage
    } = this.props;

    return (
      <ContentPageBuilder
        itemId={pageId}
        state={page && page.state}
        notFound={!!(!loading && !page)}
        onRemove={removePage}
        publish={publishPage}
        unpublish={unpublishPage}
        Revisions={Revisions}
        type='page'
      />
    );
  }
}
