import bind from 'decorators/bind';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updatePageTitle, updatePageSlug} from 'actions/page';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Page from './components/page';

@dataConnect(
  (state) => ({
    params: state.router.params,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({updatePageTitle, updatePageSlug}, dispatch),
  (props) => ({
    fragments: Page.fragments,
    variablesTypes: {
      page: {
        _id: 'ID!'
      }
    },
    initialVariables: {
      page: {
        _id: props.params.id
      }
    }
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    relate: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updatePage: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      sidebar: null
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.setState({
        sidebar: null
      });
      this.props.relate.setVariables({
        page: {
          _id: nextProps.params.id
        }
      });
    }
  }

  @bind
  updateTitle (title) {
    const {page} = this.props;
    return this.props.updatePageTitle(page._id, title);
  }

  @bind
  updateSlug (slug) {
    const {page} = this.props;
    return this.props.updatePageSlug(page._id, slug);
  }

  @bind
  togglePageInfo () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'info' ? null : 'info'
    });
  }

  @bind
  togglePageRevisions () {
    const {sidebar} = this.state;
    this.setState({
      sidebar: sidebar === 'revisions' ? null : 'revisions'
    });
  }

  render () {
    const {page, location, loading} = this.props;
    return (
      <Page
        {...this.state}
        page={page}
        location={location}
        loading={loading}
        updateTitle={this.updateTitle}
        updateSlug={this.updateSlug}
        togglePageInfo={this.togglePageInfo}
        togglePageRevisions={this.togglePageRevisions}
      />
    );
  }
}
