import 'styles/normalize.less';
import 'styles/nucleo/index.less';

import React, {PropTypes} from 'react';
import Component from 'components/component';

import styles from './index.css';
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
