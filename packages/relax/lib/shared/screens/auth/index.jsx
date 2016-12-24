import 'styles/icons/nucleo/index.less';
import 'styles/normalize.less';

import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';
import Logo from './components/logo';

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className={styles.content}>
        <Logo />
        {this.props.children}
      </div>
    );
  }
}
