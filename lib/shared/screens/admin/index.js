import 'styles/normalize.less';
import 'styles/nucleo/index.less';

import rootDataConnect from 'decorators/root-data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Admin from './components/admin';

@rootDataConnect()
export default class AdminContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <Admin {...this.props}>
        {this.props.children}
      </Admin>
    );
  }
}
