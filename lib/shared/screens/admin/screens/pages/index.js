import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Pages from './components/pages.jsx';

@connect(
  (state) => ({
    count: state.pages.count
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  onNew () {

  }

  render () {
    const {count} = this.props;
    return (
      <Pages onNew={::this.onNew} count={count}>
        {this.props.children}
      </Pages>
    );
  }
}
