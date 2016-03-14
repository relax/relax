import Component from 'components/component';
import React, {PropTypes} from 'react';
import {updatePage} from 'actions/page';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import Page from './components/page';

@dataConnect(
  (state) => ({
    page: state.page.data,
    params: state.router.params,
    location: state.router.location
  }),
  (dispatch) => bindActionCreators({updatePage}, dispatch),
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

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.relate.setVariables({
        page: {
          _id: nextProps.params.id
        }
      });
    }
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
