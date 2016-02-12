import 'styles/normalize.less';
import 'styles/nucleo/index.less';

import dataConnect from 'decorators/data-connector';
import rootDataConnect from 'decorators/root-data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Admin from './components/admin';

@rootDataConnect()
@dataConnect()
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
