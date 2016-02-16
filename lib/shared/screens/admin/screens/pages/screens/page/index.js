import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Page from './components/page';

@dataConnect()
@connect(
  (state) => ({
    page: state.page.data,
    params: state.router.params,
    location: state.router.location
  })
)
export default class PageContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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

  render () {
    const {page, location} = this.props;
    return (
      <Page
        page={page}
        location={location}
      />
    );
  }
}
