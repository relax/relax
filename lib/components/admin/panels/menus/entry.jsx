import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Lightbox from '../../../lightbox';

export default class Entry extends Component {
  static fragments = {
    menu: {
      _id: 1,
      title: 1,
      slug: 1,
      date: 1
    }
  }

  static propTypes = {
    removeMenu: React.PropTypes.func.isRequired,
    duplicateMenu: React.PropTypes.func.isRequired,
    menu: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      removing: false
    };
  }

  removeMenu (event) {
    event.preventDefault();
    this.setState({
      removing: true
    });
  }

  cancelRemove (event) {
    event.preventDefault();
    this.setState({
      removing: false
    });
  }

  confirmRemove (event) {
    event.preventDefault();
    this.props.removeMenu(this.constructor.fragments, this.props.menu).done();
    this.setState({
      removing: false
    });
  }

  render () {
    const menu = this.props.menu;
    const editLink = '/admin/menus/' + menu._id;
    const date = 'Created - ' + moment(menu.date).format('MMMM Do YYYY');

    return (
      <div key={menu._id} className='entry'>
        <div className={cx('icon-part')}>
          <i className='material-icons'>menu</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{menu.title}</span>
          </div>
          <div className='under-title'>{date}</div>
          <div className='actions'>
            <A href={editLink}>
              <i className='material-icons'>mode_edit</i>
              <span>Edit</span>
            </A>
            <a href='#' onClick={this.removeMenu.bind(this)}>
              <i className='material-icons'>remove_circle_outline</i>
              <span>Remove</span>
            </a>
          </div>
        </div>
        {this.renderRemoving()}
      </div>
    );
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove ' + this.props.menu.title + ' menu?';
      const label1 = 'You\'ll loose this menu\'s data forever!';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='medium centered'>{label1}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete it!</a>
          </div>
        </Lightbox>
      );
    }
  }
}
