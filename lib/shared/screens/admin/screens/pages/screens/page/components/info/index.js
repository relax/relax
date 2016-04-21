import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {removePage, publishPage, unpublishPage} from 'actions/page';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import PageInfo from './info';

@dataConnect(
  (state) => ({
    pageId: state.router.params.id
  }),
  (dispatch) => bindActionCreators({removePage, publishPage, unpublishPage}, dispatch),
  (props) => ({
    fragments: PageInfo.fragments,
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
export default class PageInfoContainer extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired
  };

  @bind
  onDelete () {
    const {pageId} = this.props;
    this.props.removePage(pageId, true);
  }

  @bind
  publishPage () {
    const {pageId} = this.props;
    this.props.publishPage(pageId);
  }

  @bind
  unpublishPage () {
    const {pageId} = this.props;
    this.props.unpublishPage(pageId);
  }

  render () {
    const {page} = this.props;
    return (
      <PageInfo
        page={page}
        onDelete={this.onDelete}
        publishPage={this.publishPage}
        unpublishPage={this.unpublishPage}
      />
    );
  }
}
