import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updatePage} from 'actions/page';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Page from './components/page';

@dataConnect()
@connect(
  (state) => ({
    page: state.page.data,
    params: state.router.params,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({updatePage}, dispatch)
)
export default class PageContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updatePage: PropTypes.func.isRequired
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
      fragments: Page.fragments,
      variables: {
        page: {
          _id: {
            value: props.params.id,
            type: 'ID!'
          }
        }
      }
    });
  }

  updateTitle (title) {
    const {page} = this.props;
    return this.props.updatePage(Page.fragments.page, {_id: page._id, title});
  }

  updateSlug (slug) {
    const {page} = this.props;
    return this.props.updatePage(Page.fragments.page, {_id: page._id, slug});
  }

  render () {
    const {page, location} = this.props;
    return (
      <Page
        page={page}
        location={location}
        updateTitle={::this.updateTitle}
        updateSlug={::this.updateSlug}
      />
    );
  }
}
