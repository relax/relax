import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import List from './list';
import New from './new';

export default class AddOverlay extends Component {
  static fragments = List.fragments

  static propTypes = {
    tab: PropTypes.oneOf(['new', 'open']).isRequired,
    changeTab: PropTypes.func.isRequired,
    pages: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
  }

  changeTab (tab, event) {
    event.preventDefault();
    this.props.changeTab(tab);
  }

  render () {
    return (
      <div className='add-overlay'>
        <div className='title'>
          <span className={cx('label', this.props.tab === 'new' && 'active')} onClick={this.changeTab.bind(this, 'new')}>
            Add new page
          </span>
          <span className='sep'>/</span>
          <span className={cx('label', this.props.tab === 'open' && 'active')} onClick={this.changeTab.bind(this, 'open')}>
            Open existing page
          </span>
        </div>
        <div className='content'>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent () {
    let result;
    if (this.props.tab === 'new') {
      result = <New {...this.props} />;
    } else {
      result = <List pages={this.props.pages} onClose={this.props.onClose} />;
    }
    return result;
  }
}
