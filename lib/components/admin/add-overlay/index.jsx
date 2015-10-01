import React from 'react';
import {Component, Router} from 'relax-framework';
import cx from 'classnames';

import NewPage from '../panels/pages/manage';
import List from './list';

import pageActions from '../../../client/actions/page';

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
    this.setState({
      state: 'loading'
    });

    let data = {
      title: pageData.title,
      slug: pageData.slug
    };
    data.createdBy = this.props.user._id;
    data.updatedBy = this.props.user._id;

    pageActions
      .add(data)
      .then((page) => {
        this.props.onClose();
        Router.prototype.navigate('/admin/page/'+page.slug, {trigger: true});
      })
      .catch(() => {
        this.setState({
          state: 'error'
        });
      });
  }

  changeContent (content, event) {
    event.preventDefault();
    this.setState({
      content
    });
  }

  renderContent () {
    if (this.state.content === 'new') {
      return <NewPage onSubmit={this.addNewPage.bind(this)} state={this.state.state} />;
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
