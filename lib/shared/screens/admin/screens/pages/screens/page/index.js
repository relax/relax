import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Page from './components/page';

@dataConnect()
@connect(
  (state) => ({
    page: state.page.data,
    params: state.router.params
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.array.isRequired,
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
    const {page} = this.props;
    return (
      <Page
        page={page}
      />
    );
  }
}
