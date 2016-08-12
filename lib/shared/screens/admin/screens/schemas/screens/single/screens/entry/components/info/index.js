import bind from 'decorators/bind';
import Component from 'components/component';
import PageInfo from 'components/content-page-info';
import React, {PropTypes} from 'react';
import {removePage, publishPage, unpublishPage} from 'actions/page';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    schemaId: state.router.params.id,
    entryId: state.router.params.entryId
  }),
  (dispatch) => bindActionCreators({removePage, publishPage, unpublishPage}, dispatch),
  (props) => ({
    fragments: {
      schemaEntry: PageInfo.fragments.item
    },
    variablesTypes: {
      schemaEntry: {
        schemaId: 'ID!',
        id: 'ID!'
      }
    },
    initialVariables: {
      schemaEntry: {
        schemaId: props.schemaId,
        id: props.entryId
      }
    }
  })
)
export default class PageInfoContainer extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    entryId: PropTypes.string.isRequired,
    schemaEntry: PropTypes.object
  };

  getInitState () {
    return {
      removeConfirm: false
    };
  }

  @bind
  onDelete () {
    this.setState({
      removeConfirm: true
    });
  }

  @bind
  cancelDelete () {
    this.setState({
      removeConfirm: false
    });
  }

  @bind
  confirmRemovePage () {
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
    const {schemaEntry} = this.props;
    const {removeConfirm} = this.state;

    return (
      <PageInfo
        item={schemaEntry}
        removeConfirm={removeConfirm}
        onDelete={this.onDelete}
        cancelDelete={this.cancelDelete}
        confirmRemove={this.confirmRemovePage}
        publish={this.publishPage}
        unpublish={this.unpublishPage}
      />
    );
  }
}
