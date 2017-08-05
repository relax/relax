import 'styles/normalize.less';

import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

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
