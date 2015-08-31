import React from 'react';
import {Component} from 'relax';
import cx from 'classnames';

import NewPage from '../../panels/pages/manage';
import List from './list';

export default class AddOverlay extends Component {
  getInitialState () {
    return {
      content: 'new'
    };
  }

  getChildContext () {
    return {
      onClose: this.props.onClose
    };
  }

  addNewPage (pageData) {

  }

  changeContent (content, event) {
    event.preventDefault();
    this.setState({
      content
    });
  }

  renderContent () {
    if (this.state.content === 'new') {
      return <NewPage onSubmit={this.addNewPage.bind(this)} />;
    } else {
      return <List />;
    }
  }

  render () {
    return (
      <div className='add-overlay'>
        <div className='title'>
          <span className={cx('label', this.state.content === 'new' && 'active')} onClick={this.changeContent.bind(this, 'new')}>Add new page</span>
          <span className='sep'>/</span>
          <span className={cx('label', this.state.content === 'open' && 'active')} onClick={this.changeContent.bind(this, 'open')}>Open existing page</span>
        </div>
        <div className='content'>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

AddOverlay.childContextTypes = {
  onClose: React.PropTypes.func.isRequired
};
