import Component from 'components/component';
import React, {PropTypes} from 'react';

import Content from './components/content.jsx';

export default class MenusContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <Content>{this.props.children}</Content>
    );
  }
}
