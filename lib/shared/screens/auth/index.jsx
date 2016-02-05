import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <div className='page-init'>
        <div className='logo'>
          <img src='/images/admin/logo_big.png' width='150' />
          <div className='version'>beta</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
