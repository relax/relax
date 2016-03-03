import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Pages from './components/pages.jsx';

@dataConnect(
  (props) => ({
    fragments: {
      pagesCount: true
    }
  })
)
export default class PagesContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    pagesCount: PropTypes.number
  };

  render () {
    const {pagesCount} = this.props;
    return (
      <Pages count={pagesCount}>
        {this.props.children}
      </Pages>
    );
  }
}
