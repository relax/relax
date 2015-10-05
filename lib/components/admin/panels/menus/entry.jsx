import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import cx from 'classnames';
import A from '../../../a';
import Lightbox from '../../../lightbox';

import menuActions from '../../../../client/actions/menu';

export default class Entry extends Component {
  getInitialState () {
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
    menuActions.remove(this.props.menu._id);
    this.setState({
      removing: false
    });
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove '+this.props.menu.title+' menu?';
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

  render () {
    const menu = this.props.menu;

    let editLink = '/admin/menus/'+menu.slug;
    let date = 'Created - ' + moment(menu.date).format('MMMM Do YYYY');

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
          <div className='under-title'>{menu.state}</div>
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
}

Entry.propTypes = {
  menu: React.PropTypes.object.isRequired
};
