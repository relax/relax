import * as pageActions from '../client/actions/page';
import * as pagesActions from '../client/actions/pages';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, mergeFragments} from 'relax-framework';

import AddOverlay from '../components/admin/add-overlay';
import Overlay from '../components/overlay';

@connect(
  (state) => ({
    pages: state.pages.data.items,
    isSlugValid: state.page.isSlugValid,
    count: state.pages.data.count,
    session: state.session.data
  }),
  (dispatch) => ({
    ...bindActionCreators(pagesActions, dispatch),
    ...bindActionCreators(pageActions, dispatch)
  })
)
export default class PagesContainer extends Component {
  static fragments = mergeFragments(
    AddOverlay.fragments,
    {
      page: {
        _id: 1,
        title: 1
      }
    }
  )

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    validatePageSlug: PropTypes.func.isRequired,
    addPage: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
  }

  getInitState () {
    return {
      tab: 'new',
      state: '',
      page: {
        title: '',
        slug: ''
      }
    };
  }

  onChange (page) {
    this.setState({
      page
    });
  }

  changeTab (tab) {
    this.setState({
      tab
    });
  }

  async validateSlug (slug, pageId = null) {
    return await this.props.validatePageSlug({slug, pageId});
  }

  async onSubmit () {
    this.setState({
      state: 'loading'
    });
    const submitPage = {
      title: this.state.page.title,
      slug: this.state.page.slug,
      createdBy: this.props.session._id,
      updatedBy: this.props.session._id
    };
    try {
      await this.props.addPage(this.constructor.fragments, submitPage, true);
      this.props.onClose();
    } catch (err) {
      this.setState({
        state: 'error'
      });
    }
  }

  render () {
    return (
      <Overlay onClose={this.props.onClose}>
        <AddOverlay
          {...this.props}
          {...this.state}
          changeTab={::this.changeTab}
          onChange={::this.onChange}
          validateSlug={::this.validateSlug}
          onSubmit={::this.onSubmit}
        />
      </Overlay>
    );
  }
}
