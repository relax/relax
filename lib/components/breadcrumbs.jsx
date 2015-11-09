import React from 'react';
import {Component} from 'relax-framework';
import A from './a';

export default class Breadcrumbs extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  render () {
    return (
      <div className='breadcrumbs'>
        {this.props.data.map(this.renderBreadcrumb, this)}
      </div>
    );
  }

  renderBreadcrumb (item, index) {
    var props = {
      className: 'breadcrumb'
    };
    var result;

    if (item.link) {
      props.href = item.link;

      result = (
        <span key={index}>
          <A {...props}>{item.label}</A>
          <i className='fa fa-angle-right'></i>
        </span>
      );
    } else {
      result = (
        <span key={index}>{item.label}</span>
      );
    }

    return result;
  }
}
