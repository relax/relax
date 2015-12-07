import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Balloon extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <div className='balloon'>
        <span className='triangle'/>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
