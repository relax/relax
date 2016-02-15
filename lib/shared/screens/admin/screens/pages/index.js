import Component from 'components/component';
import React, {PropTypes} from 'react';

import Pages from './components/pages.jsx';

export default class PagesContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  onNew () {

  }

  render () {
    return (
      <Pages onNew={::this.onNew}>
        {this.props.children}
      </Pages>
    );
  }
}
