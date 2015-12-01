import React from 'react';
import {Component} from 'relax-framework';

export default class Category extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    defaultOpened: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    defaultOpened: true
  }

  getInitState () {
    return {
      toggled: this.props.defaultOpened
    };
  }

  toggle (event) {
    event.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    });
  }

  render () {
    return (
      <div className='category'>
        <div className='category-info' onClick={this.toggle.bind(this)}>
          <i className='material-icons'>{this.props.icon}</i>
          <span className='title'>{this.props.title}</span>
          <span className='toggle'>
            <i className='material-icons'>{this.state.toggled ? 'expand_less' : 'expand_more'}</i>
          </span>
        </div>
        <div className='category-entries'>
          {this.state.toggled && this.props.children}
        </div>
      </div>
    );
  }
}
