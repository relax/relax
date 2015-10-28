import * as overlaysActions from '../../client/actions/overlays';
import * as pageActions from '../../client/actions/page';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component} from 'relax-framework';

import Overlay from '../../components/overlay';
import RevisionsOverlay from '../../components/admin/revisions-overlay';

@connect(
  (state) => ({
    page: state.page.data,
    revisions: state.page.data.revisions,
    errors: state.page.errors
  }),
  (dispatch) => ({
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(overlaysActions, dispatch)
  })
)
export default class RevisionsContainer extends Component {
  static fragments = RevisionsOverlay.fragments

  static panelSettings = {
    activePanelType: 'page',
    breadcrumbs: [
      {
        label: 'Pages',
        type: 'pages',
        link: '/admin/pages'
      }
    ]
  }

  static propTypes = {
    page: PropTypes.object,
    revisions: PropTypes.array,
    getPage: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.getPage(this.constructor.fragments, this.props.page.slug);
  }

  onClose () {
    this.props.closeOverlay('revisions');
  }

  getCurrentPageProps () {
    const {page} = this.props;

    return {
      _id: {
        _id: page._id,
        __v: page.__v
      },
      date: page.updatedDate,
      user: page.updatedBy,
      title: page.title
    };
  }

  render () {
    return (
      <Overlay onClose={::this.onClose}>
        <RevisionsOverlay
          current={this.getCurrentPageProps()}
          revisions={this.props.revisions}
        />
      </Overlay>
    );
  }
}
