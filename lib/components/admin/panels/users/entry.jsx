import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import A from '../../../a';
import Lightbox from '../../../lightbox';
import Utils from '../../../../utils';

import userActions from '../../../../client/actions/user';

export default class Entry extends Component {
  getInitialState () {
    return {
      removing: false
    };
  }

  onRemove (event) {
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
    userActions.remove(this.props.user._id);
    this.setState({
      removing: false
    });
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the user '+this.props.user.name+'?';
      const label1 = 'This action cannot be reverted';
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
    const user = this.props.user;
    let profileLink = '/admin/users/'+user.username;
    let date = 'Registered - ' + moment(user.date).format('MMMM Do YYYY');
    let url = Utils.getGravatarImage(user.email, 70);

    return (
      <div key={user._id} className='entry'>
        <div className='image-part'>
          <div className='img'>
            <img src={url} />
          </div>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{user.name}</span>
          </div>
          <div className='under-title'>{date}</div>
          <div className='under-title'>{'Username - '+user.username}</div>
          <div className='under-title'>{'Email - '+user.email}</div>
          <div className='actions'>
            <A href={profileLink}>
              <i className='material-icons'>person</i>
              <span>Profile</span>
            </A>
            <a href='#' onClick={this.onRemove.bind(this)}>
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
  user: React.PropTypes.object.isRequired
};
