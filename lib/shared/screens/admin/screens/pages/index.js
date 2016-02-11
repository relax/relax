import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Pages from './components/pages.jsx';

@dataConnect()
@connect(
  (state) => ({
    pages: state.pages.data.items
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: Pages.fragments
    });
  }

  onBack () {

  }

  onNew () {
    
  }

  render () {
    const {pages} = this.props;
    return (
      <Pages pages={pages} onBack={::this.onBack} onNew={::this.onNew} />
    );
  }
}
